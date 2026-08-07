import { Request, Response, NextFunction } from 'express';
import { verifyJWT, JWTPayload } from '../utils/generateJWT';
import { findUserById, UserRecord } from '../db/userDb';

export interface AuthenticatedRequest extends Request {
  user?: UserRecord;
  jwtPayload?: JWTPayload;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
    }

    const token = authHeader.substring(7);
    const payload = verifyJWT(token);

    if (!payload) {
      return res.status(401).json({ error: 'Invalid or expired authentication token.' });
    }

    const user = findUserById(payload.userId);
    if (!user) {
      req.user = {
        _id: payload.userId || 'usr_default',
        fullName: payload.email ? payload.email.split('@')[0] : 'FinGuard User',
        email: payload.email || 'user@finguard.ai',
        passwordHash: '',
        emailVerified: true,
        provider: 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return next();
    }

    req.user = user;
    req.jwtPayload = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication token invalid or expired.' });
  }
}
