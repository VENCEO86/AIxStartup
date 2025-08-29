import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { JwtPayload } from '../middleware/auth.middleware';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    };

    // Temporary fix for JWT signing
    const secret = process.env.JWT_SECRET || 'temp-secret-key';
    return jwt.sign(payload, secret, {
      expiresIn: '7d'
    });
  }

  static generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    };

    // Temporary fix for JWT signing
    const secret = process.env.JWT_SECRET || 'temp-secret-key';
    return jwt.sign(payload, secret, {
      expiresIn: '30d'
    });
  }

  static async registerUser(userData: {
    email: string;
    name: string;
    password?: string;
    provider?: 'local' | 'google' | 'kakao' | 'naver' | 'apple';
    providerId?: string;
    avatar?: string;
  }): Promise<User> {
    const { email, name, password, provider = 'local', providerId, avatar } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password if provided
    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await this.hashPassword(password);
    }

    // Create user
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      provider,
      providerId,
      avatar,
      isActive: true,
      isAdmin: false
    });

    return user;
  }

  static async loginUser(email: string, password: string): Promise<{ user: User; token: string; refreshToken: string }> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    if (user.provider !== 'local') {
      throw new Error('Please use social login');
    }

    if (!user.password) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, token, refreshToken };
  }

  static async findOrCreateSocialUser(profile: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    provider: 'google' | 'kakao' | 'naver' | 'apple';
  }): Promise<{ user: User; token: string; refreshToken: string; isNewUser: boolean }> {
    const { id, email, name, avatar, provider } = profile;

    let user = await User.findOne({
      where: {
        [provider === 'google' ? 'providerId' : 'email']: provider === 'google' ? id : email
      }
    });

    let isNewUser = false;

    if (!user) {
      // Create new user
      user = await this.registerUser({
        email,
        name,
        provider,
        providerId: id,
        avatar
      });
      isNewUser = true;
    } else {
      // Update existing user info
      await user.update({
        name,
        avatar,
        lastLoginAt: new Date()
      });
    }

    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, token, refreshToken, isNewUser };
  }

  static async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const secret = process.env.JWT_SECRET || 'temp-secret-key';
      const decoded = jwt.verify(refreshToken, secret) as JwtPayload;
      const user = await User.findByPk(decoded.userId);

      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
