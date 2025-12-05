import loginLocators from '../locators/loginLocators.js';


class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // use locator factories from `loginLocators`
        this.usernameInput = loginLocators.usernameInput(page);
        this.passwordInput = loginLocators.passwordInput(page);
        this.loginButton = loginLocators.loginButton(page);
        this.errorTitleMessage = loginLocators.errorTitleMessage(page);
        this.errorTextMessage = loginLocators.errorTextMessage(page);
    }

    async visit() {
        await this.page.goto('/');
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

    /**
     * Convenience method: visit page, enter credentials, and click login
     * @param {string} username
     * @param {string} password
     */
    async loginAs(username, password) {
        await this.visit();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

export default LoginPage;