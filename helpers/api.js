/**
 * API Helper
 * Provides methods for API interactions
 */

const GITHUB_API_BASE = 'https://api.github.com';

export class ApiHelper {
  constructor(request, baseUrl = GITHUB_API_BASE) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.token = null;
  }

  /**
   * Get default headers for API requests
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Playwright-Test',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Get user information
   * @param {string} username - GitHub username
   * @returns {Promise<Object>} - User data
   */
  async getUser(username) {
    const response = await this.request.get(`${this.baseUrl}/users/${username}`, {
      headers: this.getHeaders(),
    });

    if (response.status() === 200) {
      return await response.json();
    } else {
      throw new Error(`Failed to get user: ${response.status()}`);
    }
  }

  /**
   * Get all repositories for a user
   * @param {string} username - GitHub username
   * @returns {Promise<Array>} - Array of repositories
   */
  async getRepositories(username) {
    const response = await this.request.get(`${this.baseUrl}/users/${username}/repos`, {
      headers: this.getHeaders(),
    });

    if (response.status() === 200) {
      return await response.json();
    } else {
      throw new Error(`Failed to get repositories: ${response.status()}`);
    }
  }

  /**
   * Get a specific repository
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<Object>} - Repository data
   */
  async getRepository(owner, repo) {
    const response = await this.request.get(`${this.baseUrl}/repos/${owner}/${repo}`, {
      headers: this.getHeaders(),
    });

    if (response.status() === 200) {
      return await response.json();
    } else {
      throw new Error(`Failed to get repository: ${response.status()}`);
    }
  }

  /**
   * Set token manually (from environment or other source)
   * @param {string} token - GitHub token
   */
  setToken(token) {
    this.token = token;
  }

  /**
   * Get the stored token
   * @returns {string|null} - The authentication token
   */
  getToken() {
    return this.token;
  }
}

export default ApiHelper;
