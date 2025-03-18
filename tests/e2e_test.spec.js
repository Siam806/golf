// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Navigate to the right path before each test
  await page.goto("http://localhost:5173");
});

test("First page is right", async ({page}) => {
  // Is title of the first page right?
  await expect(page).toHaveTitle("Handicalc")
})
