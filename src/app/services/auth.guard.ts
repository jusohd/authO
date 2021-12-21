import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private navCtrl: NavController
  ) { }

  async canActivate(): Promise<boolean> {
    const authed = await this.authentication.isAuthenticated();
    console.log('AuthGuard', authed);
    console.log('AuthGuard', this.authentication);

    if (authed) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  }

}
