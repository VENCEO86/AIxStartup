import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3004',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ 
    success: true,
    data: { 
      ok: true, 
      ts: Date.now(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    },
    message: "Server is healthy"
  });
});

// API test endpoint
app.get("/api/test", (_req, res) => {
  res.json({ 
    success: true,
    data: { 
      message: "API OK", 
      at: new Date().toISOString() 
    },
    message: "API connection test successful"
  });
});

// Dashboard data endpoint
app.get("/api/dashboard", (_req, res) => {
  res.json({
    success: true,
    data: {
      totals: { 
        sales: 12345000, 
        purchases: 6789000,
        profit: 12345000 - 6789000
      },
      topClients: [
        { name: "Alpha Co", sales: 5500000 },
        { name: "Beta Ltd", sales: 4200000 },
        { name: "Gamma Inc", sales: 2645000 }
      ],
      monthlyData: [
        { month: "2025-01", revenue: 100000, expense: 80000, profit: 20000 },
        { month: "2025-02", revenue: 120000, expense: 90000, profit: 30000 },
        { month: "2025-03", revenue: 150000, expense: 110000, profit: 40000 },
        { month: "2025-04", revenue: 180000, expense: 130000, profit: 50000 },
        { month: "2025-05", revenue: 200000, expense: 140000, profit: 60000 },
        { month: "2025-06", revenue: 250000, expense: 160000, profit: 90000 }
      ]
    },
    message: "Dashboard data retrieved successfully"
  });
});

// Settings endpoint
app.get("/api/settings", (_req, res) => {
  const settings = {
    user: { id: "real-user-123", email: "admin@aixstartup.com" },
    org: { id: "real-org-456", name: "AIxStartup" },
    features: { abac: true, rbac: true, policyHotReload: false },
    theme: "light"
  };

  res.json(settings);
});

// User profile endpoints
app.get("/api/user/profile", (_req, res) => {
  // Mock user profile data
  const userProfile = {
    id: "1",
    name: "Admin User",
    email: "admin@aixstartup.com",
    avatar: "/api/avatars/default.png",
    phone: "+82-10-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    isAdmin: true,
    membershipLevel: "Pro",
    createdAt: "2024-01-01",
    lastLoginAt: "2024-12-26T12:00:00Z"
  };

  res.json({
    success: true,
    data: userProfile,
    message: "User profile retrieved successfully"
  });
});

app.put("/api/user/profile", (req, res) => {
  const { name, email, phone, address } = req.body;
  
  // Mock profile update
  const updatedProfile = {
    id: "1",
    name: name || "Admin User",
    email: email || "admin@aixstartup.com",
    avatar: "/api/avatars/default.png",
    phone: phone || "+82-10-1234-5678",
    address: address || "서울특별시 강남구 테헤란로 123",
    isAdmin: true,
    membershipLevel: "Pro",
    createdAt: "2024-01-01",
    lastLoginAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedProfile,
    message: "Profile updated successfully"
  });
});

// Membership levels endpoint
app.get("/api/membership/levels", (_req, res) => {
  const membershipLevels = [
    {
      level: "Basic",
      price: "무료",
      features: [
        "기본 매출/지출 관리",
        "월간 리포트",
        "기본 분석 도구",
        "이메일 지원"
      ],
      limitations: [
        "최대 100건 거래",
        "1개 회사만 관리",
        "기본 템플릿만 사용"
      ]
    },
    {
      level: "Pro",
      price: "월 29,000원",
      features: [
        "무제한 거래 관리",
        "무제한 회사 관리",
        "고급 분석 도구",
        "커스텀 템플릿",
        "우선 지원",
        "API 접근"
      ],
      limitations: [
        "최대 5명 사용자",
        "기본 통합 기능"
      ]
    },
    {
      level: "Enterprise",
      price: "월 99,000원",
      features: [
        "모든 Pro 기능",
        "무제한 사용자",
        "고급 통합 기능",
        "전담 매니저",
        "24/7 지원",
        "커스텀 개발 지원"
      ],
      limitations: []
    }
  ];

  res.json({
    success: true,
    data: membershipLevels,
    message: "Membership levels retrieved successfully"
  });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "internal_error" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API test: http://localhost:${PORT}/api/test`);
  console.log(`Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`Settings: http://localhost:${PORT}/api/settings`);
  console.log(`User profile: http://localhost:${PORT}/api/user/profile`);
});
