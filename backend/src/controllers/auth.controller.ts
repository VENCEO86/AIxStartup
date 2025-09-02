import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types';
import { User } from '../models/user.model';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        res.status(400).json({
          success: false,
          error: 'Email, name, and password are required'
        });
        return;
      }

      const user = await AuthService.registerUser({
        email,
        name,
        password
      });

      const token = AuthService.generateToken(user);
      const refreshToken = AuthService.generateRefreshToken(user);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.isAdmin
          },
          token,
          refreshToken
        },
        message: 'User registered successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
        return;
      }

      const { user, token, refreshToken } = await AuthService.loginUser(email, password);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.isAdmin
          },
          token,
          refreshToken
        },
        message: 'Login successful'
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: 'Refresh token is required'
        });
        return;
      }

      const { token, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        data: {
          token,
          refreshToken: newRefreshToken
        },
        message: 'Token refreshed successfully'
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed'
      });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a more complex implementation, you might want to blacklist the token
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
  }

  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      // This will be called after authenticateToken middleware
      const user = req.user as User;

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to get profile'
      });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as User;
      const { name, avatar } = req.body;

      const updatedUser = await user.update({
        name: name || user.name,
        avatar: avatar || user.avatar
      });

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin
          }
        },
        message: 'Profile updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  }
}
