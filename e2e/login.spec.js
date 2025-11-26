const {test, expect} = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test.describe('Login Page Tests', () => {
    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.visit();
    });

    test('should display login form', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('should login with valid credentials', async () => {
        await loginPage.enterUsername('validUser');
        await loginPage.enterPassword('validPassword');
        await loginPage.clickLogin();

        // Assuming successful login redirects to dashboard
        await expect(loginPage.page).toHaveURL('/dashboard');
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.enterUsername('invalidUser');
        await loginPage.enterPassword('invalidPassword');
        await loginPage.clickLogin();

        const errorMessage = loginPage.page.locator('.error-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Invalid username or password.');
    });
});