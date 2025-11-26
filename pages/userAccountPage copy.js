const locators = require('../locators/loginLocators');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator(locators.usernameInput);
        this.passwordInput = page.locator(locators.passwordInput);
        this.loginButton = page.locator(locators.loginButton);
    }

    async visit() {
        await this.page.goto('/login');
    }

    async enterUsername(username) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

module.exports = LoginPage;