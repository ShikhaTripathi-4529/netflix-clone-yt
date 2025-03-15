export const environment = {
  production: false,
  apiKey: '', // Leave empty for security, set via GitHub Secrets
  apiBaseUrl: 'https://api.themoviedb.org/3',
  getHeaders: () => ({
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`
    }
  })
};
