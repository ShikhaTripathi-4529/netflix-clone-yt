export const environment = {
  production: true,
  apiKey: '', // Set via GitHub Secrets
  apiBaseUrl: 'https://api.themoviedb.org/3',
  getHeaders: () => ({
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`
    }
  })
};
