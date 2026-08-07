import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  findUserById,
  findUserByGoogleId,
  createUser,
  updateUser,
  UserRecord
} from '../db/userDb';
import { generateOTP } from '../utils/generateOTP';
import { generateJWT } from '../utils/generateJWT';
import {
  sendVerificationOTPEmail,
  sendPasswordResetOTPEmail,
  loadSentEmails
} from '../services/emailService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export function sanitizeUser(user: UserRecord) {
  const { passwordHash, otp, otpExpiry, resetOTP, resetOTPExpiry, ...safeUser } = user;
  return {
    ...safeUser,
    name: safeUser.fullName,
  };
}

// Password validation regex & helper
export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character.';
  return null;
}

// 1. REGISTER / SIGN UP
export async function registerController(req: Request, res: Response) {
  try {
    const { fullName, email, password, confirmPassword, acceptTerms } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email Address is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const passErr = validatePassword(password);
    if (passErr) {
      return res.status(400).json({ error: passErr });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Confirm password must match.' });
    }

    if (acceptTerms === false) {
      return res.status(400).json({ error: 'You must accept Terms & Privacy Policy to continue.' });
    }

    const existingUser = findUserByEmail(email.trim());
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins

    const newUser = createUser({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      emailVerified: false,
      otp,
      otpExpiry,
      provider: 'email',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName.trim())}`,
    });

    // Send verification email
    sendVerificationOTPEmail(newUser.email, newUser.fullName, otp);

    return res.status(201).json({
      success: true,
      message: 'Verification email has been sent to your email address.',
      email: newUser.email,
      requiresVerification: true,
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
}

// 2. LOGIN / SIGN IN
export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required.' });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Verify your email to continue.',
        emailVerified: false,
        email: user.email,
      });
    }

    // Update last login
    updateUser(user._id, { lastLogin: new Date().toISOString() });

    const token = generateJWT({
      userId: user._id,
      email: user.email,
      emailVerified: user.emailVerified,
    });

    return res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
}

// 3. VERIFY EMAIL (OTP)
export async function verifyEmailController(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and 6-digit OTP code are required.' });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    if (user.emailVerified) {
      const token = generateJWT({
        userId: user._id,
        email: user.email,
        emailVerified: true,
      });
      return res.status(200).json({
        success: true,
        message: 'Email is already verified.',
        token,
        user: sanitizeUser(user),
      });
    }

    if (!user.otp || user.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Invalid 6-digit verification code.' });
    }

    if (!user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' });
    }

    const updatedUser = updateUser(user._id, {
      emailVerified: true,
      otp: null,
      otpExpiry: null,
      lastLogin: new Date().toISOString(),
    })!;

    const token = generateJWT({
      userId: updatedUser._id,
      email: updatedUser.email,
      emailVerified: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully! Access granted.',
      token,
      user: sanitizeUser(updatedUser),
    });
  } catch (err: any) {
    console.error('Verify Email error:', err);
    return res.status(500).json({ error: 'Internal server error during verification.' });
  }
}

// 4. RESEND OTP / SEND OTP
export async function resendOTPController(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      return res.status(404).json({ error: 'Account not found with this email.' });
    }

    const newOtp = generateOTP();
    const newOtpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    updateUser(user._id, {
      otp: newOtp,
      otpExpiry: newOtpExpiry,
    });

    sendVerificationOTPEmail(user.email, user.fullName, newOtp);

    return res.status(200).json({
      success: true,
      message: `A new 6-digit verification code has been sent to ${user.email}.`,
    });
  } catch (err: any) {
    console.error('Resend OTP error:', err);
    return res.status(500).json({ error: 'Internal server error while resending code.' });
  }
}

// 5. FORGOT PASSWORD
export async function forgotPasswordController(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email Address is required.' });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      // Return 200 to prevent user enumeration
      return res.status(200).json({
        success: true,
        message: "We've sent a password reset link if the account exists.",
      });
    }

    const resetOTP = generateOTP();
    const resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    updateUser(user._id, {
      resetOTP,
      resetOTPExpiry,
    });

    sendPasswordResetOTPEmail(user.email, user.fullName, resetOTP);

    return res.status(200).json({
      success: true,
      message: "We've sent a password reset link to your email.",
      email: user.email,
    });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Internal server error while requesting password reset.' });
  }
}

// 6. RESET PASSWORD
export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Email, OTP code, and new password are required.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Confirm password must match.' });
    }

    const passErr = validatePassword(newPassword);
    if (passErr) {
      return res.status(400).json({ error: passErr });
    }

    const user = findUserByEmail(email.trim());
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    if (!user.resetOTP || user.resetOTP !== otp.trim()) {
      return res.status(400).json({ error: 'Invalid reset code. Please check your email or request a new code.' });
    }

    if (!user.resetOTPExpiry || new Date(user.resetOTPExpiry) < new Date()) {
      return res.status(400).json({ error: 'Reset code has expired. Please request a new password reset.' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    updateUser(user._id, {
      passwordHash: newPasswordHash,
      resetOTP: null,
      resetOTPExpiry: null,
    });

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully! Please log in with your new passcode.',
    });
  } catch (err: any) {
    console.error('Reset password error:', err);
    return res.status(500).json({ error: 'Internal server error during password reset.' });
  }
}

// 7. GOOGLE SIGN IN
export async function googleAuthController(req: Request, res: Response) {
  try {
    const { googleId, email, fullName, avatarUrl } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required for Google authentication.' });
    }

    const userEmail = email.trim().toLowerCase();
    const userName = fullName?.trim() || email.split('@')[0] || 'Google User';
    const gId = googleId || `goog_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const photo = avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`;

    // Check if user exists by googleId or email
    let user = findUserByGoogleId(gId) || findUserByEmail(userEmail);

    if (!user) {
      // Auto-create new user with Google credentials
      const dummyPasswordHash = await bcrypt.hash(`GoogleAuthPass_${Date.now()}`, 10);
      user = createUser({
        fullName: userName,
        email: userEmail,
        passwordHash: dummyPasswordHash,
        emailVerified: true,
        provider: 'google',
        googleId: gId,
        avatarUrl: photo,
      });
    } else {
      // Log in to existing user account, updating provider info & last login
      user = updateUser(user._id, {
        emailVerified: true,
        googleId: user.googleId || gId,
        avatarUrl: avatarUrl || user.avatarUrl || photo,
        lastLogin: new Date().toISOString(),
      })!;
    }

    // Generate JWT application session token
    const token = generateJWT({
      userId: user._id,
      email: user.email,
      emailVerified: true,
    });

    return res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (err: any) {
    console.error('Google Auth error:', err);
    return res.status(500).json({ error: 'Google authentication failed.' });
  }
}

// 8. GET ME (/api/auth/me)
export async function getMeController(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  return res.status(200).json({
    success: true,
    user: sanitizeUser(req.user),
  });
}

// 9. LOGOUT
export async function logoutController(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
}

// 10. UPDATE PROFILE
export async function updateProfileController(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { fullName, avatarUrl } = req.body;
    const updates: Partial<UserRecord> = {};

    if (fullName && fullName.trim()) updates.fullName = fullName.trim();
    if (avatarUrl) updates.avatarUrl = avatarUrl;

    const updated = updateUser(req.user._id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: sanitizeUser(updated),
    });
  } catch (err: any) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
}

// 11. GET SENT EMAILS FOR MAIL SIMULATOR
export async function getSentEmailsController(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    emails: loadSentEmails(),
  });
}
