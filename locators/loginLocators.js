/**
 * Playwright locator factories (ESM)
 * Usage in page objects: `this.usernameInput = loginLocators.usernameInput(page);`
 */
const loginLocators = {
  usernameInput: (page) => page.locator('input[name="username"]'),
  passwordInput: (page) => page.locator('input[name="password"]'),
  loginButton: (page) => page.getByRole('button', { name: 'Log In' }),
  errorTitleMessage: (page) => page.locator('h1.title'),
  errorTextMessage: (page) => page.locator('.error')
};

export default loginLocators;
