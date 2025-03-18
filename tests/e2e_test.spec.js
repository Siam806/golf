// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	// Navigate to the right path before each test
	await page.goto("http://localhost:5173");
});

test("Check title of the first page", async ({ page }) => {
	// Is title of the first page right?
	await expect(page.getByRole("heading", { name: "HANDICALC", exact: true })).toBeVisible();
});

test.describe("should test Create, Filter, Delete", () => {
	test.describe.configure({ mode: "serial" });

	test.beforeEach("Test sign up", async ({ page }) => {
		// New user's access rights
		await expect(page.getByText("HandicalcHome")).toBeVisible();

		await page.getByRole("textbox", { name: "Gib deinen Namen ein" }).fill("MaxMustermannn");
		await page.getByRole("combobox").selectOption("Golfer");
		await page.getByRole("textbox", { name: "E-Mail-Adresse" }).fill("mxm@gmail.com");
		await page.getByRole("textbox", { name: "Passwort" }).fill("12345678");
		await page.getByRole("button", { name: "visibility_off" }).click();
		await expect(page.getByRole("textbox", { name: "Passwort" })).toHaveValue("12345678");
		await page.getByRole("button", { name: "Registrieren" }).click();
	});

	test("Test login inputs", async ({ page }) => {
		await page.getByRole("button", { name: "Ausloggen" }).click();
		await page.getByRole("button", { name: "zur Anmeldung" }).click();
		await page.getByRole("textbox", { name: "E-Mail-Adresse" }).fill("mxm@gmail.com");
		await page.getByRole("textbox", { name: "Passwort" }).fill("12345678");
		await page.getByRole("button", { name: "visibility_off" }).click();
		await expect(page.getByRole("textbox", { name: "Passwort" })).toHaveValue("12345678");
		await page.getByRole("button", { name: "Anmelden" }).click();
	});

	test("Test user role system", async ({ page }) => {
		// Golfer's access rights
		await expect(page.getByText("HandicalcHomeScoresEGASDErgebnisseWHS👋 Hi, MaxMustermannn!logout")).toBeVisible();

		// Speilführer's access rights
		await page.getByRole("button", { name: "Bearbeiten" }).click();
		await page.getByRole("combobox").selectOption("Spielführer");
		await page.getByRole("button", { name: "Sichern" }).click();
		await expect(page.getByText("HandicalcHomeMitgliederEGASDErgebnisseWHS👋 Hi, MaxMustermannn!logout")).toBeVisible();
		await expect(page.getByRole("main")).toContainText("Spielführer");

		// Sekretär's access rights
		await page.getByRole("button", { name: "Bearbeiten" }).click();
		await page.getByRole("combobox").selectOption("Sekretär");
		await page.getByRole("button", { name: "Sichern" }).click();
		await expect(page.getByText("HandicalcHomeMitgliederErgebnisseSpielvorgabe👋 Hi, MaxMustermannn!logout")).toBeVisible();
		await expect(page.getByRole("main")).toContainText("Sekretär");
	});

	test("Test user story 1", async ({ page }) => {
		await page.getByRole("link", { name: "EGA" }).click();
		page.once("dialog", (dialog) => dialog.accept());
		await page.getByRole("button", { name: "BERECHNEN & Speichern" }).click();
		await expect(page.getByText("23.8")).toBeVisible();
	});

	test("Test user story 2", async ({ page }) => {
		await page.getByRole("link", { name: "EGA" }).click();
		await page.getByRole("button", { name: "BERECHNEN & Speichern" }).click();

		await page.getByRole("link", { name: "WHS" }).click();
		await page.getByRole("button", { name: "Berechne WHS Handicap" }).click();
		await expect(page.getByText("🏌️‍♂️ World Handicap System (WHS)Berechne WHS HandicapDein WHS Handicap: 33.")).toBeVisible();
	});

	test("Test user story 3", async ({ page }) => {
		await page.getByRole("link", { name: "Scores" }).click();
		await page.getByRole("button", { name: "BERECHNEN & Speichern" }).click();
		await expect(page.getByText("EGA:23.8WHS:")).toBeVisible();
	});

	test("Test user story 4", async ({ page }) => {
		await page.getByRole("button", { name: "Bearbeiten" }).click();
		await page.getByRole("combobox").selectOption("Spielführer");
		await page.getByRole("button", { name: "Sichern" }).click();
		await page.getByRole("link", { name: "Ergebnisse" }).click();
		await expect(
			page
				.locator("div")
				.filter({ hasText: /^Runde 1Score Differential: 37\.4Nutzer: johnDoe@gmail\.com$/ })
				.getByRole("paragraph")
				.nth(1)
		).toBeVisible();
		await expect(page.getByRole("main")).toContainText("Details");
		page.once("dialog", (dialog) => dialog.accept());
		await page.locator(".bg-blue-600").first().click();
		await page.getByRole("textbox", { name: "Bisheriges Handicap" }).fill("4.5");
		page.once("dialog", (dialog) => {
			console.log(`Dialog message: ${dialog.message()}`);
			console.log("Navigate Spielführer to send email");
			dialog.dismiss().catch(() => {});
		});
		await page.getByRole("button", { name: "BERECHNEN & Updaten" }).click();
		await page.getByRole("link", { name: "Zurück zur Ergebnisübersicht" }).click();
		await expect(page.getByText("Score Differential: 69.67")).toBeVisible();
	});

	
	// TODO: write test for user story 5
	// test("Test user story 5", async ({ page }) => {
	// });


	// TODO: write test for user story 6
	// test("Test user story 6", async ({ page }) => {
	// });
});
