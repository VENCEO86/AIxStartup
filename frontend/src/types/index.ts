export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google' | 'kakao' | 'naver' | 'apple';
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
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
  description?: string;
  createdAt: string;
  updatedAt: string;
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
  description?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  partnerId: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  invoiceNumber?: string;
  notes?: string;
  attachment?: string;
  createdAt: string;
  updatedAt: string;
  partner?: Partner;
}

export interface DashboardData {
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  topPartners: Partner[];
  monthlyData: MonthlyData[];
  recentTransactions: Transaction[];
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
}

export interface ApiResponse<T = any> {
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

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface PartnerFormData {
  name: string;
  businessNumber: string;
  accountNumber?: string;
  type: 'revenue' | 'expense';
  category: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface TransactionFormData {
  partnerId: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  invoiceNumber?: string;
  notes?: string;
}

export interface CompanyFormData {
  name: string;
  businessNumber: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface UrlShortener {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  title?: string;
  description?: string;
  tags?: string;
  clickCount: number;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  page: string;
  referrer?: string;
  event?: string;
  eventData?: object;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  createdAt: string;
  updatedAt: string;
}
