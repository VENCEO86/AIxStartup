import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google' | 'kakao' | 'naver' | 'apple';
  providerId?: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  businessNumber: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  userId: string;
  name: string;
  businessNumber: string;
  accountNumber?: string;
  type: 'revenue' | 'expense';
  category: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  partnerId: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  topPartners: Partner[];
  monthlyData: MonthlyData[];
  recentTransactions: Transaction[];
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
