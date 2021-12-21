import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
        // Once handleCallback completes, Auth Connect calls onLoginSuccess() in Authentication service
        await this.authService.handleLoginCallback(window.location.href);
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async login() {
    const loadingIndicator = await this.showLoadingIndictator();
    try {
      console.log('LoginPage:: login');      
      await this.authService.login();
    } catch (e) {
      console.log(`caught error ${e.message}`);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...'
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
