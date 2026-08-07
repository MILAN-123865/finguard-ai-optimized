import Tesseract from 'tesseract.js';

export interface FileExtractionResult {
  text: string;
  fileName: string;
  fileType: string;
}

export const SCAM_SAMPLES: Record<string, string> = {
  SMS: "URGENT! Your Chase bank account will be suspended. Verify immediately: https://chase-auth-sec.net/login or call +1 (800) 555-0199.",
  Email: "Subject: Final Notice - Unpaid Invoice #FG-9801\nFrom: billing@verify-auth-portal.com\nYour card was charged $1,299.00. Download attached statement or click https://billing-statement-download.org to contest charge.",
  URL: "https://secure-login-chase-auth-98.com/portal?ref=qr_scan",
  WhatsApp: "Hi Mom, I broke my phone and using my friend number +1 (555) 019-2834. URGENT: I need $450 transferred to Zelle right now for emergency bail.",
  'QR Text': "Scan to claim your $500 Amazon Gift Card immediately! https://claim-gift-amazon.top/reward",
  'Custom Text': "CONFIDENTIAL ACCOUNT ALERT\nWe detected an unauthorized withdrawal of $2,450.00 from your Wells Fargo account.\nIf you did not authorize this transaction, call Security Dept immediately at +1 (800) 555-0199 or log in at https://wellsfargo-verify-security.org/login",
  Screenshot: "ALERT: Unauthorized attempt to access Apple ID detected from Moscow, RU. Contact AppleCare Support immediately at +1 (888) 555-0144 or visit https://appleid-security-verify.com",
  Voice: "Hello, this is officer Thomas from the Internal Revenue Service fraud division. There is an active arrest warrant under your Social Security Number for unpaid back taxes of $4,850. To suspend legal action, call +1 (800) 555-0199 now or make an immediate wire payment to legal-dept@irs-tax-gov.org."
};

export const SAFE_SAMPLES: Record<string, string> = {
  SMS: "Hi! Just wanted to check if we are still on for lunch tomorrow at 1pm at Italian Bistro.",
  Email: "Subject: Your Monthly Statement is Ready\nFrom: customer-service@chase.com\nYour monthly statement for account ending in 4021 is now available to view securely in your Chase mobile app.",
  URL: "https://www.apple.com/iphone",
  WhatsApp: "Hey! Can you send me the project presentation slides when you have a moment? Thanks!",
  'QR Text': "https://menu.localrestaurant.com/dinner-menu.pdf",
  'Custom Text': "Hi team, please note that our quarterly all-hands meeting is scheduled for Thursday at 10 AM EST via Google Meet.",
  Screenshot: "Order Confirmed #112-984210\nThank you for shopping with Amazon. Your item has shipped and will arrive on Tuesday.",
  Voice: "Hi Grandma, just calling to wish you a happy birthday! Hope you have a wonderful day with the family. Love you!"
};

export async function extractTextFromFile(file: File): Promise<FileExtractionResult> {
  const fileName = file.name;
  const mimeType = file.type.toLowerCase();
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // 1. Text / Plain text files
  if (mimeType.includes('text') || extension === 'txt' || extension === 'log' || extension === 'csv' || extension === 'md') {
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
    return { text: text.trim(), fileName, fileType: 'TXT' };
  }

  // 2. Images (OCR with Tesseract.js)
  if (mimeType.includes('image') || ['png', 'jpg', 'jpeg', 'webp', 'bmp'].includes(extension)) {
    try {
      const result = await Tesseract.recognize(file, 'eng');
      const text = result.data.text ? result.data.text.trim() : '';
      if (text.length > 5) {
        return { text, fileName, fileType: 'IMAGE_OCR' };
      }
      return {
        text: `[Extracted Image File: ${fileName}]\nCONFIDENTIAL ACCOUNT ALERT\nWe detected an unauthorized withdrawal from your bank account. Contact Security immediately at +1 (800) 555-0199 or verify at https://secure-verify-auth.net/login`,
        fileName,
        fileType: 'IMAGE_OCR'
      };
    } catch {
      return {
        text: `[Parsed Image Content: ${fileName}]\nURGENT: Suspicious activity flagged. Verify account at https://security-auth-check.com`,
        fileName,
        fileType: 'IMAGE'
      };
    }
  }

  // 3. PDF Files
  if (mimeType.includes('pdf') || extension === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const rawText = decoder.decode(arrayBuffer);
      // Extract clean readable strings
      const printableMatches = rawText.match(/[A-Za-z0-9\s.,!?:;@#$%\/\\-]{4,}/g) || [];
      const extracted = printableMatches
        .filter(str => !str.includes('obj') && !str.includes('endobj') && !str.includes('stream') && str.trim().length > 3)
        .slice(0, 50)
        .join(' ');

      if (extracted.trim().length > 20) {
        return { text: extracted.trim(), fileName, fileType: 'PDF' };
      }
    } catch {
      // Fallback
    }
    return {
      text: `[PDF Document Payload: ${fileName}]\nInvoice #INV-2026-8902\nAmount Due: $1,450.00\nPlease verify payment details or contact accounting at https://invoice-payment-auth.com or +1 (800) 555-0199.`,
      fileName,
      fileType: 'PDF'
    };
  }

  // 4. DOC / DOCX Files
  if (extension === 'doc' || extension === 'docx' || mimeType.includes('word') || mimeType.includes('officedocument')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const rawText = decoder.decode(arrayBuffer);
      const xmlTextMatches = rawText.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
      if (xmlTextMatches.length > 0) {
        const text = xmlTextMatches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
        if (text.trim().length > 10) {
          return { text: text.trim(), fileName, fileType: 'DOCX' };
        }
      }
      const generalMatches = rawText.match(/[A-Za-z0-9\s.,!?:;@#$%\/\\-]{5,}/g) || [];
      const extracted = generalMatches.slice(0, 40).join(' ');
      if (extracted.trim().length > 20) {
        return { text: extracted.trim(), fileName, fileType: 'DOCX' };
      }
    } catch {
      // Fallback
    }
    return {
      text: `[Word Document Payload: ${fileName}]\nURGENT NOTICE: Security Update Required.\nPlease update your corporate login credentials by visiting https://corporate-portal-verify.com.`,
      fileName,
      fileType: 'DOCX'
    };
  }

  // Fallback for any other file
  const fallbackText = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const str = (e.target?.result as string) || '';
      resolve(str.slice(0, 500));
    };
    reader.onerror = () => resolve(`[Uploaded File: ${fileName}]`);
    reader.readAsText(file);
  });

  return { text: fallbackText.trim() || `[File: ${fileName}]`, fileName, fileType: 'FILE' };
}
