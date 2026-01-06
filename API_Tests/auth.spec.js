import { test, expect } from '@playwright/test';
import ApiHelper from '../helpers/api.js';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'NikolayNes';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

test.describe('GitHub API Tests', () => {
  let githubApi;

  test.beforeEach(async ({ request }) => {
    githubApi = new ApiHelper(request);
    if (GITHUB_TOKEN && GITHUB_TOKEN !== 'your_github_personal_access_token') {
      githubApi.setToken(GITHUB_TOKEN);
    }
  });

  test('get repositories by username', async () => {
    const repos = await githubApi.getRepositories(GITHUB_USERNAME);
    expect(Array.isArray(repos)).toBeTruthy();
    expect(repos.length).toBeGreaterThan(0);
    console.log(`\n Found ${repos.length} repositories:`);
    repos.slice(0, 5).forEach((repo) => {
      console.log(`  - ${repo.name} (${repo.stargazers_count})`);
    });
  });

  test('get specific repository details', async () => {
    const repo = await githubApi.getRepository(GITHUB_USERNAME, 'playwright_project');
    expect(repo).toHaveProperty('name');
    expect(repo.name).toBe('playwright_project');
    console.log(`\n Repository Details:`);
    console.log(`  - Name: ${repo.name}`);
    console.log(`  - URL: ${repo.html_url}`);
    console.log(`  - Stars: ${repo.stargazers_count}`);
    console.log(`  - Forks: ${repo.forks_count}`);
    console.log(`  - Language: ${repo.language}`);
    console.log(`  - Description: ${repo.description}`);
  });

  test('get user information without authentication', async () => {
    const user = await githubApi.getUser(GITHUB_USERNAME);
    expect(user).toHaveProperty('login');
    expect(user.login).toBe(GITHUB_USERNAME);
    console.log(`\n User Information (Public):`);
    console.log(`  - Login: ${user.login}`);
    console.log(`  - Name: ${user.name || 'N/A'}`);
    console.log(`  - Bio: ${user.bio || 'N/A'}`);
    console.log(`  - Location: ${user.location || 'N/A'}`);
    console.log(`  - Public Repos: ${user.public_repos}`);
    console.log(`  - Followers: ${user.followers}`);
  });
});
