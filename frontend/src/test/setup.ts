import { vi } from 'vitest';

// Mock fetch globally for tests
Object.defineProperty(window, 'fetch', {
  value: vi.fn(),
  writable: true,
});

// Mock console methods
Object.defineProperty(window, 'console', {
  value: {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
  writable: true,
});
