import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject, Observable } from 'rxjs';
import { IonicAuth } from '@ionic-enterprise/auth';
import { environment, AzureAd, B2cConfig } from 'src/environments/environment';
import { IonicAuthOptions } from '@ionic-enterprise/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {
  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  constructor(platform: Platform) {
    const selectedConfig = environment.isAzureAd ? AzureAd : B2cConfig;

    super(selectedConfig);

    this._loginStatusChanged = new Subject();
  }

  // Snippet example: Password reset
  async login() {
    try {
      console.log('AuthenticationService:: login');
      await super.login().then((response) => {
        console.log('AuthenticationService:: login:: response', response);
      }, (error) => {
        console.log('AuthenticationService:: login:: error', error);
      });

      super.handleLoginCallback().then((response) => {
        console.log('AuthenticationService:: handleLoginCallback:: response', response);
      }, (error) => {
        console.log('AuthenticationService:: handleLoginCallback:: error', error);
      });
      this._loginStatusChanged.next(true);
    }
    catch (error) {
      // Handle password reset (only applicable for Azure AD B2C)
      const message: string = error.message;
      console.log('AuthenticationService:: login error: ', error);
      if (message && message.startsWith('AADB2C90118')) {
        await super.login(environment.b2cConfig.signUpSignInAuthority);
        this._loginStatusChanged.next(true);
      } else {
        throw new Error(error.error);
      }
    }
  }

  /*
  async login(): Promise<void> {
    try {
      console.log('AuthenticationService:: login');
      super.additionalLoginParameters
      await super.login().then((response)=>{
        console.log('AuthenticationService:: login:: response', response);
      });
      this._loginStatusChanged.next(true);
      await this.handleLoginCallback().then((response) => {
        console.log('AuthenticationService:: handleLoginCallback:: response', response);
        this._loginStatusChanged.next(true);

      }, (error) => {
        console.log('AuthenticationService:: handleLoginCallback:: error', error);
      });
    } catch (err) {
      // Handle the password reset case for Azure AD
      console.log('AuthenticationService:: login error:', + err);
      const message: string = err.message;
      // This is the error code returned by the Azure AD servers on failure.
      if (message !== undefined && message.startsWith('AADB2C90118')) {
        // The address you pass back is the custom user flow (policy) endpoint
        console.log('AuthenticationService:: login:: if');
        await super.login(environment.b2cConfig.signUpSignInAuthority);
      } else {
        throw new Error(err.error);
      }
    }
  }
  */

  onLoginSuccess() {
    // Web only: Using "current window" sign-in,
    console.log('AuthenticationService:: onLoginSuccess');
    this._loginStatusChanged.next(true);
  }

  onLogout() {
    this._loginStatusChanged.next(false);
  }

  async getUserInfo() {
    const idToken = await this.getIdToken();
    console.log('LOGIN SUCCES', idToken);

    if (!idToken) {
      return;
    }

    let email = idToken.email;
    if (idToken.emails instanceof Array) {
      email = idToken.emails[0];
    }

    return {
      id: idToken.sub,
      email: email,
      firstName: idToken.given_name,
      lastName: idToken.family_name,
      picture: "assets/user-placeholder.jpg"
    };
  }

}
