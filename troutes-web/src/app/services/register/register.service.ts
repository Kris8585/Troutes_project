import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _angularFireAuth: AngularFireAuth, private _angularFirestore: AngularFirestore, private _loginService:LoginService) { }

  saveUser(user: UserType) {
    this._angularFirestore.collection<UserType>('users').add(user);
  }

  register(user: UserType, password: string) {

    this._angularFireAuth.auth.createUserWithEmailAndPassword(user.email, password).then((result) => {
      user.userId = result.user.uid;
      this.saveUser(user);
      alert("El usuario fue registrado correctamente, Bienvenido!");
      this._loginService.login(user.email,password);
    }).catch((error) => {
      alert("No se ha podido registrar el usuario por" + error);

    });

  }


}
