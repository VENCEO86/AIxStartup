import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';
import { User } from '../models/user.model';

export interface JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access token required'
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'temp-secret-key';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    const user = await User.findByPk(decoded.userId);
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        error: 'Invalid or inactive user'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Authentication error'
      });
    }
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
    return;
  }

  if (!req.user.isAdmin) {
    res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
    return;
  }

  next();
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const secret = process.env.JWT_SECRET || 'temp-secret-key';
      const decoded = jwt.verify(token, secret) as JwtPayload;
      const user = await User.findByPk(decoded.userId);
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore token errors for optional auth
  }

  next();
};
