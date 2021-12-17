import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  constructor(platform: Platform) {
    this._loginStatusChanged = new Subject();
  }
}
