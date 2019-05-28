import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataInformationService } from '../data-information/data-information.service';
import { SnotifyService } from 'ng-snotify';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  currentUser: UserType;
  userSuscription: Subscription;


  constructor(private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _dataInformationService: DataInformationService,
    private _snotifyService: SnotifyService,
    private _angularFirestore: AngularFirestore,
    private _ngZone: NgZone) { }



  setCurrentUser(email: string) {
    this.userSuscription = this._dataInformationService.getUserByEmail(email).subscribe(
      (siteUsers) => {
        this.currentUser = siteUsers[0];
      });
  }

  setCurrentObject(user: UserType) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(email: string, password: string) {

    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.setCurrentUser(email);
      this._router.navigateByUrl('/public/home');
    }).catch((error) => {
      this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
    });
  }

  logout() {
    this.currentUser = null;
    this._angularFireAuth.auth.signOut();
    this._router.navigateByUrl('/account/login');
  }

  singOut() {
    this.currentUser = null;
    this._angularFireAuth.auth.signOut();
  }
  checkCurrentUserRole(role: string) {
    return this.currentUser && this.currentUser.role.includes(role);
  }

  getCurrentUserRole() {
    return this.currentUser.role;
  }
  recovery(email: string) {
    this._angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => this._snotifyService.success('Se ha enviado un correo para restaurar su cuenta', 'Excelente'))
      .catch((error) => this._snotifyService.warning('Se ha presentado el siguiente error: ' + error, 'Atención'))
  }

  goTo() {
    this._router.navigateByUrl('/public/home')
  }

  loginGoogle() {

    this._angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value) => {
      if (this._angularFireAuth.auth.currentUser) {

        const user: UserType = {
          'userId': value.user.uid,
          'name': value.user.displayName,
          'nationality': null,
          'description': null,
          'email': value.user.email,
          'role': 'Viewer',
          'profile_photo': null
        }
        this.setCurrentObject(user);
        this._angularFirestore.collection<UserType>('users').add(user);
        this._ngZone.run(() => { this.goTo(); });
      }
    }).catch((error) => {

      this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');

    });

  }


}
