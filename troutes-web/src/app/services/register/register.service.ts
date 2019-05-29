import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from '../login/login.service';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _loginService: LoginService,
    private _snotifyService: SnotifyService) { }

  saveUser(user: UserType) {
    this._angularFirestore.collection<UserType>('users').add(user);
  }

  register(user: UserType, password: string) {

    this._angularFireAuth.auth.createUserWithEmailAndPassword(user.email, password).then((result) => {
      user.userId = result.user.uid;
      this.saveUser(user);
      this._snotifyService.success('El usuario fue registrado correctamente, Bienvenido!', 'Excelente');
      this._loginService.login(user.email, password);
    }).catch((error) => {
      this._snotifyService.warning('No se ha podido registrar el usuario por:' + error, 'Registro de usuarios');
    });

  }

  setUpdateUser(user: UserType): string {
    if (user.userId && user.userId != '') {
      this._angularFirestore.collection<UserType>('users').doc(user.userId).update(user);
    } else {
      user.userId = this._angularFirestore.createId();
      this._angularFirestore.collection<UserType>('users').doc(user.userId).set(user);
    }
    return user.userId;
  }
}
