// Test credentials - read from environment variables or use defaults
// Structure: auth.{userType}.{credentialField}
// Example: credentials.auth.admin.username

export default {
  auth: {
    // Invalid credentials - for testing error scenarios
    invalid: {
      username: process.env.INVALID_USER || 'wrongUser',
      password: process.env.INVALID_PASS || 'wrongPass',
    },
    
    // Valid credentials for different user roles
    admin: {
      username: process.env.ADMIN_USER || 'admin@example.com',
      password: process.env.ADMIN_PASS || 'adminPassword123',
    },
    
    user: {
      username: process.env.USER_LOGIN || 'user@example.com',
      password: process.env.USER_PASSWORD || 'userPassword123',
    },
    
    moderator: {
      username: process.env.MOD_USER || 'moderator@example.com',
      password: process.env.MOD_PASS || 'modPassword123',
    },
    
    // Add more roles as needed
    // guest: { ... }
    // premium: { ... }
  },
};
