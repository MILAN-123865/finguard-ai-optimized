import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'finguard_cyber_secure_jwt_secret_key_2026';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  emailVerified: boolean;
}

export function generateJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}
