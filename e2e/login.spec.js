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
         console.log(process.env.INVALID_USER);   
          console.log(process.env.INVALID_PASS);   
        await loginPage.loginAs(process.env.INVALID_USER, process.env.INVALID_PASS);
        await loginPage.errorTitleMessage.waitFor({ state: 'visible' });
        await expect(loginPage.errorTitleMessage).toBeVisible();
        await expect(loginPage.errorTitleMessage).toHaveText(staticTexts.auth.errorTitle);
        await expect(loginPage.errorTextMessage).toBeVisible();
        await expect(loginPage.errorTextMessage).toHaveText(staticTexts.auth.errorText);
        
    });
})