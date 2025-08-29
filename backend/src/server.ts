import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan("dev"));

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

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "internal_error" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
