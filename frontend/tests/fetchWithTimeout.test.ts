import { describe, it, expect, vi } from "vitest";
import { fetchWithTimeout } from "../src/lib/fetchWithTimeout";

describe("fetchWithTimeout", () => {
  it("should work with normal fetch", async () => {
    // Mock fetch to return a quick response
    const mockResponse = new Response("{}");
    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    
    global.fetch = mockFetch;
    
    const result = await fetchWithTimeout("https://example.com", {}, 1000);
    
    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith("https://example.com", {
      signal: expect.any(AbortSignal)
    });
  });

  it("should handle fetch errors", async () => {
    // Mock fetch to throw an error
    const mockError = new Error("Network error");
    const mockFetch = vi.fn().mockRejectedValue(mockError);
    
    global.fetch = mockFetch;
    
    await expect(
      fetchWithTimeout("https://example.com", {}, 1000)
    ).rejects.toThrow("Network error");
  });
});
