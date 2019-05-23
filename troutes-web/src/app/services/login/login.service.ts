import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataInformationService } from '../data-information/data-information.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  currentUser: UserType;
  userSuscription: Subscription;

  constructor(private _angularFireAuth: AngularFireAuth, private _router: Router, private _dataInformationService: DataInformationService) { }

  setCurrentUser(email: string) {
    this.userSuscription = this._dataInformationService.getUserByEmail(email).subscribe((siteUsers) => {
      this.currentUser = siteUsers[0];
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(email: string, password: string) {
    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.setCurrentUser(email);
      this._router.navigateByUrl('/home');
    }).catch((error) => {
      alert("Error, no se pudo iniciar la sesión");
    });

  }

  logout(){
    this.currentUser=null;
    this._angularFireAuth.auth.signOut();
    this._router.navigateByUrl('/account/login');
  }
}
