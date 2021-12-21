import { IonicAuthOptions } from '@ionic-enterprise/auth';

export const environment = {
  url: 'https://pwa-office-manager-dev-teams.azurewebsites.net',
  production: true,
  isAzureAd: false,
  b2cConfig: {
    signUpSignInAuthority: 'https://managerofficedev.b2clogin.com/managerofficedev.onmicrosoft.com/B2C_1A_signup_signin',
  }
};

export const AzureAd: IonicAuthOptions = {
  authConfig: 'auth0',
  platform: 'web',
  clientID: '72be596b-67e1-43c8-8dff-b04d9093395d',
  discoveryUrl: 'https://login.microsoftonline.com/a2927dc6-fd53-4ed2-94f0-7772c3efd749',
  redirectUri: `${window.location.origin}/home`,
  scope: 'api://d5846942-2332-4de3-9a80-38dfe15fe270/access_as_user',
  logoutUrl: `${window.location.origin}/login`,
  iosWebView: 'private',
  implicitLogin: 'CURRENT'
};

export const B2cConfig: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'web',
  clientID: '5c765ca7-0e57-4295-be62-9e00a94cc2da',
  discoveryUrl: 'https://managerofficedev.b2clogin.com/managerofficedev.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_SIGNUP_SIGNIN',
  redirectUri: `${window.location.origin}/home`,
  // redirectUri: `${environment.url}/home`,
  scope: 'openid https://managerofficedev.onmicrosoft.com/api/access_as_user',
  logoutUrl: `${window.location.origin}/login`,
  implicitLogin: 'CURRENT',
  // tokenStorageProvider: 'localStorage',
  iosWebView: 'private',
};
