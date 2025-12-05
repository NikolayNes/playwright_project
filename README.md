# Playwright Project

A test automation framework built with **Playwright** for end-to-end testing of web applications.

## 📋 Project Overview

This project demonstrates a modern approach to test automation using the **Page Object Model (POM)** pattern with Playwright. It includes structured test suites, reusable page objects, and centralized locators for maintainability and scalability.

**Repository:** [NikolayNes/playwright_project](https://github.com/NikolayNes/playwright_project)

## 🎯 Key Features

- ✅ **Page Object Model Pattern** - Organized structure with page objects and locators
- ✅ **End-to-End Testing** - Comprehensive test coverage for critical user flows
- ✅ **HTML Test Reports** - Detailed test execution reports
- ✅ **Chrome Browser Support** - Configured for Chromium testing
- ✅ **Trace Collection** - Automatic trace collection on test failures for debugging

## 📁 Project Structure

```
playwright_project/
├── e2e/                          # Test specifications
│   ├── example.spec.js           # Example test suite
│   └── login.spec.js             # Login functionality tests
├── pages/                        # Page Object Models
│   ├── loginPage.js              # Login page object
│   └── userAccountPage.js        # User account page object
├── locators/                     # Centralized element locators
│   └── loginLocators.js          # Login page locators
├── fixtures/                     # Test fixtures (data and utilities)
├── playwright-report/            # Generated HTML test reports
├── test-results/                 # Test result artifacts
├── package.json                  # Project dependencies
├── playwright.config.js          # Playwright configuration
└── .gitignore                    # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NikolayNes/playwright_project.git
cd playwright_project
```

2. Install dependencies:
```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `@types/node` - TypeScript type definitions

### Running Tests

Execute all tests:
```bash
npm test
```

This command runs all test files in the `e2e/` directory using the Chromium browser.

## 🧪 Test Structure

### Login Tests (`e2e/login.spec.js`)

Comprehensive login functionality tests including:

1. **Display login form** - Verifies all login elements are visible
2. **Valid login** - Tests successful login with correct credentials
3. **Invalid login** - Tests error handling with incorrect credentials

#### Test Example:
```javascript
test('should login with valid credentials', async () => {
    await loginPage.enterUsername('validUser');
    await loginPage.enterPassword('validPassword');
    await loginPage.clickLogin();
    
    await expect(loginPage.page).toHaveURL('/dashboard');
});
```

## 📄 Page Objects

### LoginPage (`pages/loginPage.js`)

Encapsulates all login page interactions:

- `visit()` - Navigate to login page
- `enterUsername(username)` - Fill username field
- `enterPassword(password)` - Fill password field
- `clickLogin()` - Click login button

**Usage:**
```javascript
const loginPage = new LoginPage(page);
await loginPage.visit();
await loginPage.enterUsername('user@example.com');
await loginPage.enterPassword('password123');
await loginPage.clickLogin();
```

## 🎯 Locators

### Login Locators (`locators/loginLocators.js`)

Centralized element selectors for the login page:

```javascript
{
  usernameInput: '#username',
  passwordInput: '#password',
  loginButton: 'button[type="submit"]'
}
```

**Benefits:**
- Single source of truth for selectors
- Easy maintenance when UI changes
- Reduced test code duplication

## ⚙️ Configuration

### Playwright Config (`playwright.config.js`)

Key settings:

| Setting | Value | Description |
|---------|-------|-------------|
| `testDir` | `./e2e` | Directory containing test files |
| `fullyParallel` | `false` | Tests run sequentially |
| `forbidOnly` | `true` (on CI) | Fail build if `.only` found |
| `retries` | `0` (local), `2` (CI) | Retry failed tests on CI |
| `reporter` | `html` | Generate HTML reports |
| `trace` | `on-first-retry` | Collect traces on failures |

### Browser Configuration

Currently configured for **Chromium**. To enable additional browsers, uncomment in `playwright.config.js`:

```javascript
// Firefox
{
  name: 'firefox',
  use: { ...devices['Desktop Firefox'] },
},

// WebKit
{
  name: 'webkit',
  use: { ...devices['Desktop Safari'] },
}
```

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:
- Test execution timeline
- Passed/failed test results
- Screenshots and videos
- Trace files for debugging

## 🔍 Debugging

### View Execution Trace

When a test fails, a trace is automatically collected:

```bash
npx playwright show-trace test-results/<trace-file>.zip
```

### Debug Mode

Run tests in debug mode with the Playwright Inspector:

```bash
npx playwright test --debug
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.56.1 | Testing framework |
| `@types/node` | ^24.10.1 | Node.js type definitions |

This is a development branch for test development and improvements.

## 📝 Best Practices Implemented

✅ **Page Object Model** - Separation of test logic and UI interaction  
✅ **Centralized Locators** - Single source of truth for selectors  
✅ **Meaningful Test Names** - Clear test intentions  
✅ **Proper Test Structure** - BeforeEach hooks for setup  
✅ **Assertions** - Explicit expectations with Playwright's expect()  
