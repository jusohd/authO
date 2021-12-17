// import { IonicAuthOptions } from '@ionic-enterprise/auth';

export const environment = {
  production: true,
  isAzureAd: false,
  b2cConfig: {
    authConfig: 'auth0',
    platform: 'capacitor',
    clientID: '5c765ca7-0e57-4295-be62-9e00a94cc2da',
    discoveryUrl: 'https://managerofficedev.b2clogin.com/managerofficedev.onmicrosoft.com/B2C_1A_signup_signin',
    redirectUri: `${window.location.origin}/home`,
    scope: 'openid offline_access email picture profile',
    audience: 'FILL-IN',
    logoutUrl: `${window.location.origin}/login`,
    iosWebView: 'private',
  },
  azureAd: {
    authConfig: 'auth0',
    platform: 'capacitor',
    clientID: '72be596b-67e1-43c8-8dff-b04d9093395d',
    discoveryUrl: 'https://login.microsoftonline.com/a2927dc6-fd53-4ed2-94f0-7772c3efd749',
    redirectUri: `${window.location.origin}/home`,
    scope: 'openid offline_access email picture profile',
    audience: 'FILL-IN',
    logoutUrl: `${window.location.origin}/login`,
    iosWebView: 'private',
    implicitLogin: 'CURRENT'
  },
};
