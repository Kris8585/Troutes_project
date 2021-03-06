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
  userIdSuscription: Subscription;
  userCheck$: Observable<UserType[]>;
  isUserBd: string;


  constructor(private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _dataInformationService: DataInformationService,
    private _snotifyService: SnotifyService,
    private _angularFirestore: AngularFirestore,
    private _ngZone: NgZone) { }

  //--------------------------------------------------------------------
  //--------------------------Current user------------------------------
  //--------------------------------------------------------------------
  setCurrentUser(email: string) {
    this.userSuscription = this._dataInformationService.getUserByEmail(email).subscribe(
      (siteUsers) => {
        this.currentUser = siteUsers[0];
      });
  }

  setCurrenUserId(userId: string) {
    this.userIdSuscription = this._dataInformationService.getUserById(userId).subscribe(
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

  //--------------------------------------------------------------------
  //-------------------------User Exist---------------------------------
  //--------------------------------------------------------------------

  isUser(userId: string, val) {

    this._dataInformationService.getUserById(userId).subscribe((result) => {

      try {
        this.isUserBd = result[0].userId;

      } catch (error) {
        this.isUserBd = "null";
      }

      console.log(this.isUserBd);
      this.runDowm(val, userId);
    });


  }

  getUserBd() {
    return this.isUserBd;
  }

  //--------------------------------------------------------------------
  //----------------------------Login-----------------------------------
  //--------------------------------------------------------------------


  login(email: string, password: string) {

    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.setCurrentUser(email);
      this._snotifyService.success('Session Iniciada', 'Atención');
      this._router.navigateByUrl('public/home');
    }).catch((error) => {
      this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
    });
  }

  logout() {
    this.currentUser = null;
    this._angularFireAuth.auth.signOut();
    this._router.navigateByUrl('/account/login');
    this.isUserBd = "";
    this._dataInformationService.setState("INICIAR SESIÓN");
  }

  singOut() {
    this.currentUser = null;
    this._angularFireAuth.auth.signOut();
    this.isUserBd = "";
    this._dataInformationService.setState("INICIAR SESIÓN");
  }

  //--------------------------------------------------------------------
  //-----------------------Current User Role----------------------------
  //--------------------------------------------------------------------
  checkCurrentUserRole(role: string) {
    return this.currentUser && this.currentUser.role.includes(role);
  }

  getCurrentUserRole() {
    return this.currentUser.role;
  }

  //--------------------------------------------------------------------
  //---------------------------Recovery---------------------------------
  //--------------------------------------------------------------------

  recovery(email: string) {
    this._angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => this._snotifyService.success('Se ha enviado un correo para restaurar su cuenta', 'Excelente'))
      .catch((error) => this._snotifyService.warning('Se ha presentado el siguiente error: ' + error, 'Atención'))
  }

  //--------------------------------------------------------------------
  //---------------------------Navigation-------------------------------
  //--------------------------------------------------------------------
  goTo() {
    this._router.navigateByUrl('/public/home')
  }

  //--------------------------------------------------------------------
  //--------------------------LogIn Social------------------------------
  //--------------------------------------------------------------------
  loginFacebook() {
    this._angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((value) => {


      if (this._angularFireAuth.auth.currentUser) {

        let checkUserId = value.user.uid;
        this.isUser(checkUserId, value);
        this._ngZone.run(() => { this.goTo(); });
      }
    }).catch((error) => {

      this._ngZone.run(() => {
        this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
        this._snotifyService.error(error.message, 'Atención');
      });


    });

  }

  loginGoogle() {

    this._angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value) => {


      if (this._angularFireAuth.auth.currentUser) {
        let checkUserId = value.user.uid;
        this.isUser(checkUserId, value);
        this._ngZone.run(() => { this.goTo(); });
      }
    }).catch((error) => {

      this._ngZone.run(() => {
        this._snotifyService.warning('No se ha podido iniciar sesión', 'Atención');
        this._snotifyService.error(error.message, 'Atención');
      });
    });

  }
  private runDowm(value: auth.UserCredential, checkUserId: string) {
    if (this.getUserBd() == "null") {
      const user: UserType = {
        'userId': value.user.uid,
        'name': value.user.displayName,
        'nationality': "",
        'description': "",
        'email': value.user.email,
        'role': 'Viewer',
        'profile_photo': value.user.photoURL
      };
      this.setCurrentObject(user);
      this._angularFirestore.collection<UserType>('users').doc(user.userId).set(user);
    }
    else {

      this.setCurrenUserId(checkUserId);
    }
  }

}
