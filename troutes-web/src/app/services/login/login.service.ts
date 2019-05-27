import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataInformationService } from '../data-information/data-information.service';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  currentUser: UserType;
  userSuscription: Subscription;

  constructor(private _angularFireAuth: AngularFireAuth,
              private _router: Router,
              private _dataInformationService: DataInformationService,
              private _snotifyService: SnotifyService) { }

  setCurrentUser(email: string) {
    this.userSuscription = this._dataInformationService.getUserByEmail(email).subscribe(
      (siteUsers) => {
      this.currentUser = siteUsers[0];
    });
  }

  getCurrentUser() {
      return this.currentUser;
  }

  login(email: string, password: string) {
    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.setCurrentUser(email);
      this._router.navigateByUrl('/secure/home');
       }).catch((error) => {
      this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
    });
  }

  logout() {
    this.currentUser = null;
    this._angularFireAuth.auth.signOut();
    this._router.navigateByUrl('/account/login');
  }

  checkCurrentUserRole(role:string){ 
    return this.currentUser && this.currentUser.role.includes(role);
  }

  getCurrentUserRole(){
    return this.currentUser.role;
  }
  recovery(email: string) {
    this._angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => this._snotifyService.success('Se ha enviado un correo para restaurar su cuenta', 'Excelente'))
      .catch((error) => this._snotifyService.warning('Se ha presentado el siguiente error: ' + error, 'Atención'))
  }




}
