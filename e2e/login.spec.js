import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';
import staticTexts from '../fixtures/staticTexts.js';

test.describe('Login Page Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.visit();
    });

    test('should display login form', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.loginAs(process.env.INVALID_USER, process.env.INVALID_PASS);
        
        // Wait for error message to appear
        await loginPage.errorTitleMessage.waitFor({ state: 'visible', timeout: 10000 });
        await expect(loginPage.errorTitleMessage).toBeVisible();
        
        // Verify error title is shown
        await expect(loginPage.errorTitleMessage).toHaveText(staticTexts.auth.errorTitle);
        
        // Verify error message is visible 
        await expect(loginPage.errorTextMessage).toBeVisible();
        
        // Check that error message contains authentication-related text
        const errorText = await loginPage.errorTextMessage.textContent();
        expect(errorText).toBeTruthy();
        expect(errorText.toLowerCase()).toMatch(/error|invalid|failed|could not|internal/i);
    });
})