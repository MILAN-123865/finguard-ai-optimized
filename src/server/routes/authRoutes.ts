import { Router } from 'express';
import {
  registerController,
  loginController,
  verifyEmailController,
  resendOTPController,
  forgotPasswordController,
  resetPasswordController,
  googleAuthController,
  getMeController,
  logoutController,
  updateProfileController,
  getSentEmailsController
} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public auth endpoints
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/verify-email', verifyEmailController);
router.post('/send-otp', resendOTPController);
router.post('/resend-otp', resendOTPController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/google', googleAuthController);
router.post('/logout', logoutController);
router.get('/emails', getSentEmailsController);

// Protected endpoints
router.get('/me', authMiddleware as any, getMeController as any);
router.put('/profile', authMiddleware as any, updateProfileController as any);

export default router;
