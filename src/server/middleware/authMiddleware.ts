import { Request, Response, NextFunction } from 'express';
import { verifyJWT, JWTPayload } from '../utils/generateJWT';
import { findUserById, UserRecord } from '../db/userDb';

export interface AuthenticatedRequest extends Request {
  user?: UserRecord;
  jwtPayload?: JWTPayload;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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
    return res.status(401).json({ error: 'User account associated with token no longer exists.' });
  }

  req.user = user;
  req.jwtPayload = payload;
  next();
}
