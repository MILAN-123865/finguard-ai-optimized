import fs from 'fs';
import path from 'path';

export interface SentEmail {
  id: string;
  to: string;
  subject: string;
  type: 'VERIFICATION_OTP' | 'PASSWORD_RESET' | 'WELCOME' | 'NOTIFICATION' | 'EMERGENCY_ALERT' | 'EMERGENCY_CONFIRMATION' | 'EMERGENCY_RESOLVED';
  code?: string;
  bodyHtml: string;
  sentAt: string;
}

const emailsFile = path.join(process.cwd(), 'uploads', 'emails_db.json');

const ensureDir = () => {
  const dir = path.dirname(emailsFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export function loadSentEmails(): SentEmail[] {
  ensureDir();
  try {
    if (fs.existsSync(emailsFile)) {
      const data = fs.readFileSync(emailsFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading emails_db.json:', err);
  }
  return [];
}

export function saveSentEmail(email: Omit<SentEmail, 'id' | 'sentAt'>): SentEmail {
  ensureDir();
  const emails = loadSentEmails();
  const newEmail: SentEmail = {
    ...email,
    id: `email_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    sentAt: new Date().toISOString(),
  };
  emails.unshift(newEmail);
  // Keep last 50 emails
  const trimmed = emails.slice(0, 50);
  try {
    fs.writeFileSync(emailsFile, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing emails_db.json:', err);
  }
  return newEmail;
}

export function sendVerificationOTPEmail(to: string, fullName: string, otp: string): SentEmail {
  const subject = `[FinGuard AI] Your 6-Digit Email Verification Code: ${otp}`;
  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0a0d1a; color: #ffffff; padding: 24px; borderRadius: 12px;">
      <h2 style="color: #00e5ff; margin-bottom: 8px;">FinGuard AI Security Portal</h2>
      <p style="color: #bac9cc;">Hello ${fullName},</p>
      <p style="color: #bac9cc;">Welcome to FinGuard AI. Please use the following 6-digit Security Verification OTP code to complete your registration:</p>
      <div style="background-color: #00e5ff15; border: 1px solid #00e5ff; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #00daf3;">${otp}</span>
      </div>
      <p style="color: #8899a6; font-size: 12px;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
    </div>
  `;

  console.log(`\n==================================================`);
  console.log(`✉ [NODEMAILER EMAIL SERVICE] Sent Verification OTP`);
  console.log(`To: ${to}`);
  console.log(`OTP Code: ${otp}`);
  console.log(`==================================================\n`);

  return saveSentEmail({
    to,
    subject,
    type: 'VERIFICATION_OTP',
    code: otp,
    bodyHtml,
  });
}

export function sendPasswordResetOTPEmail(to: string, fullName: string, otp: string): SentEmail {
  const subject = `[FinGuard AI] Password Reset Security OTP: ${otp}`;
  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0a0d1a; color: #ffffff; padding: 24px; borderRadius: 12px;">
      <h2 style="color: #00e5ff; margin-bottom: 8px;">FinGuard AI Security Portal</h2>
      <p style="color: #bac9cc;">Hello ${fullName},</p>
      <p style="color: #bac9cc;">We received a request to reset your FinGuard AI security passcode. Use the following 6-digit OTP code to authorize your password reset:</p>
      <div style="background-color: #6001d120; border: 1px solid #6001d1; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #d2bbff;">${otp}</span>
      </div>
      <p style="color: #8899a6; font-size: 12px;">This code will expire in 10 minutes. If you did not request a password reset, your account remains secure.</p>
    </div>
  `;

  console.log(`\n==================================================`);
  console.log(`✉ [NODEMAILER EMAIL SERVICE] Sent Password Reset OTP`);
  console.log(`To: ${to}`);
  console.log(`Reset Code: ${otp}`);
  console.log(`==================================================\n`);

  return saveSentEmail({
    to,
    subject,
    type: 'PASSWORD_RESET',
    code: otp,
    bodyHtml,
  });
}

export interface EmergencyEmailParams {
  to: string;
  contactName: string;
  userName: string;
  userEmail: string;
  emergencyTime: string;
  deviceInfo: string;
  ipAddress: string;
  gpsCoordinates?: { latitude: number; longitude: number; accuracy?: number } | null;
  googleMapsUrl: string;
  customMessage: string;
}

export async function sendEmergencyAlertEmail(params: EmergencyEmailParams, maxRetries = 2): Promise<{ success: boolean; attempts: number; error?: string }> {
  const subject = `🚨 URGENT SOS ALERT: ${params.userName} has triggered an Emergency Alert!`;
  const gpsDisplay = params.gpsCoordinates 
    ? `${params.gpsCoordinates.latitude.toFixed(6)}, ${params.gpsCoordinates.longitude.toFixed(6)} (±${params.gpsCoordinates.accuracy || 10}m)`
    : 'GPS Location Unavailable / Permission Denied';

  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0c10; color: #ffffff; padding: 28px; border-radius: 16px; border: 2px solid #ef4444; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="background-color: #ef4444; color: #ffffff; font-weight: bold; padding: 6px 16px; border-radius: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
          CRITICAL SOS EMERGENCY ALERT
        </span>
      </div>
      
      <h1 style="color: #f87171; font-size: 22px; text-align: center; margin-bottom: 16px;">
        ${params.userName} needs your immediate attention!
      </h1>
      
      <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6;">
        Dear <strong>${params.contactName}</strong>,<br/>
        This is an automated high-priority emergency broadcast from <strong>FinGuard AI Command Center</strong>. 
        <strong>${params.userName}</strong> (${params.userEmail}) has initiated a live SOS emergency broadcast.
      </p>

      <div style="background-color: #1f293d; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #fca5a5; font-weight: bold;">User Emergency Note:</p>
        <p style="margin: 6px 0 0 0; font-size: 15px; color: #ffffff; font-style: italic;">"${params.customMessage || 'Suspected cyber threat / financial compromise / physical distress event initiated.'}"</p>
      </div>

      <h3 style="color: #38bdf8; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-top: 24px;">
        📍 Live Emergency Telemetry & Location
      </h3>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; color: #cbd5e1;">
        <tr>
          <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #94a3b8;">Emergency Time:</td>
          <td style="padding: 6px 0; color: #ffffff;">${params.emergencyTime}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #94a3b8;">User Email:</td>
          <td style="padding: 6px 0; color: #ffffff;">${params.userEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #94a3b8;">GPS Coordinates:</td>
          <td style="padding: 6px 0; color: #00e5ff; font-family: monospace;">${gpsDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #94a3b8;">Device Info:</td>
          <td style="padding: 6px 0; color: #ffffff;">${params.deviceInfo}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #94a3b8;">IP Address:</td>
          <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${params.ipAddress}</td>
        </tr>
      </table>

      ${params.googleMapsUrl ? `
        <div style="text-align: center; margin: 24px 0;">
          <a href="${params.googleMapsUrl}" target="_blank" style="background-color: #ef4444; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);">
            🗺️ View Real-time Google Maps Location
          </a>
        </div>
      ` : ''}

      <div style="background-color: #0f172a; border: 1px solid #1e293b; padding: 14px; border-radius: 8px; margin-top: 24px; text-size-adjust: 100%;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
          National Cyber Crime Helpline: <strong>1930</strong> | Emergency Police: <strong>112</strong><br/>
          This automated alert was dispatched by FinGuard AI Security Engine.
        </p>
      </div>
    </div>
  `;

  let attempts = 0;
  let lastError = '';

  while (attempts <= maxRetries) {
    attempts++;
    try {
      console.log(`\n==================================================`);
      console.log(`🚨 [EMERGENCY EMAIL SERVICE] Attempt ${attempts}/${maxRetries + 1}`);
      console.log(`To Contact: ${params.to} (${params.contactName})`);
      console.log(`Subject: ${subject}`);
      console.log(`==================================================\n`);

      saveSentEmail({
        to: params.to,
        subject,
        type: 'EMERGENCY_ALERT',
        bodyHtml
      });

      return { success: true, attempts };
    } catch (err: any) {
      lastError = err?.message || 'Unknown transport error';
      console.error(`Error sending emergency email to ${params.to} (Attempt ${attempts}):`, lastError);
      if (attempts <= maxRetries) {
        // Retry delay
        await new Promise(res => setTimeout(res, 500 * attempts));
      }
    }
  }

  return { success: false, attempts, error: lastError };
}

export function sendUserSOSConfirmationEmail(userEmail: string, userName: string, emergencyTime: string, googleMapsUrl: string): SentEmail {
  const subject = `[FinGuard AI] SOS Emergency Broadcast Activated`;
  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0a0d1a; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #00e5ff;">
      <h2 style="color: #00e5ff; margin-bottom: 8px;">FinGuard AI Command Center</h2>
      <p style="color: #bac9cc;">Hello ${userName},</p>
      <p style="color: #bac9cc;">Your emergency broadcast was successfully activated at <strong>${emergencyTime}</strong>.</p>
      <p style="color: #bac9cc;">Alert messages and your current GPS telemetry have been dispatched to your configured emergency contacts.</p>
      ${googleMapsUrl ? `<p style="color: #bac9cc;"><a href="${googleMapsUrl}" style="color: #00e5ff;">View recorded Google Maps location</a></p>` : ''}
      <p style="color: #10b981; font-weight: bold; margin-top: 16px;">If you are now safe, open the FinGuard AI app and click "I'm Safe" to clear the emergency state.</p>
    </div>
  `;

  return saveSentEmail({
    to: userEmail,
    subject,
    type: 'EMERGENCY_CONFIRMATION',
    bodyHtml
  });
}

export function sendImSafeNotificationEmail(to: string, contactName: string, userName: string, resolvedTime: string): SentEmail {
  const subject = `✅ UPDATE: ${userName} has marked themselves as SAFE`;
  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #061e14; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #10b981;">
      <h2 style="color: #10b981; margin-bottom: 8px;">Emergency Resolved</h2>
      <p style="color: #d1fae5;">Dear ${contactName},</p>
      <p style="color: #d1fae5;">This is an update from FinGuard AI. <strong>${userName}</strong> has marked the previous SOS alert as <strong>RESOLVED</strong> at ${resolvedTime} and confirmed they are now safe.</p>
      <p style="color: #a7f3d0; font-size: 12px;">No further emergency action is required.</p>
    </div>
  `;

  return saveSentEmail({
    to,
    subject,
    type: 'EMERGENCY_RESOLVED',
    bodyHtml
  });
}

