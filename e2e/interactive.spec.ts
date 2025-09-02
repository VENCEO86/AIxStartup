import { test, expect } from "@playwright/test";

const SAFE_SELECTOR = 'a[href^="/"], button, [role="button"]';
const DANGEROUS_TEXT = /(삭제|탈퇴|제거|지우기|delete|remove|destroy)/i;

async function loginIfNeeded(page) {
  if (!process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) return;
  try {
    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="email"], input[name="email"]').first().fill(process.env.TEST_EMAIL!);
    await page.locator('input[type="password"], input[name="password"]').first().fill(process.env.TEST_PASSWORD!);
    await Promise.all([
      page.waitForLoadState("networkidle"),
      page.keyboard.press("Enter")
    ]);
  } catch (e) {
    // 로그인 라우트가 없으면 무시
  }
}

test.describe("UI 클릭 가능 요소 자동 점검", () => {
  const routes = ["/", "/dashboard", "/partners", "/transactions", "/settings", "/login", "/register"];

  test("각 페이지에서 안전한 클릭 요소 순회", async ({ page, context, baseURL }) => {
    const origin = new URL(baseURL!).origin;

    // 외부 도메인 요청 무시(앱 외부 링크 방지)
    await context.route("**/*", (route) => {
      const url = route.request().url();
      if (!url.startsWith(origin)) return route.abort();
      route.continue();
    });

    // 콘솔 오류 수집
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (["error"].includes(msg.type())) consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await loginIfNeeded(page);

    for (const r of routes) {
      await page.goto(r, { waitUntil: "domcontentloaded" }).catch(() => {});
      await page.waitForTimeout(300); // 렌더 안정화

      const loc = page.locator(SAFE_SELECTOR);
      const count = await loc.count();
      for (let i = 0; i < count; i++) {
        const el = loc.nth(i);
        const label = (await el.innerText().catch(() => "")) || (await el.getAttribute("aria-label").catch(() => "")) || "";
        if (DANGEROUS_TEXT.test(label)) continue;

        consoleErrors.length = 0; // 에러 버퍼 초기화

        // 클릭 및 네트워크 안정화
        await el.scrollIntoViewIfNeeded().catch(() => {});
        await Promise.allSettled([
          el.click({ timeout: 5000 }),
          page.waitForLoadState("networkidle", { timeout: 5000 })
        ]);

        // 4xx/5xx 응답 감지(간단 방식: 콘솔/라우팅 오류로 대체)
        expect(consoleErrors, `콘솔 오류 @route=${r}, element="${label}"`).toEqual([]);
      }
    }
  });
});


