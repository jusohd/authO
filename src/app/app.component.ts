import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AuthenticationService,
    private navController: NavController,
  ) {
    this.initializeApp();

    this.auth.loginStatusChanged.subscribe(authenticated => this.handleAuthChange(authenticated));
  }

  async initializeApp() { }

  private handleAuthChange(authenticated: boolean) {
    if (authenticated) {
      this.navController.navigateRoot(['home']);
    } else {
      this.navController.navigateRoot(['login']);
    }
  }
}
