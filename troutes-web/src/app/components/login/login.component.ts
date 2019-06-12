import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { RegisterService } from 'src/app/services/register/register.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroupSession: FormGroup;
  public formGroupRegister: FormGroup;
  public formGroupResetPassword: FormGroup;


  constructor(public _loginService: LoginService,
    private _formBuilderSession: FormBuilder,
    private _formBuilderRegister: FormBuilder,
    private _formBuilderResetPassword: FormBuilder,
    private _snotifyService: SnotifyService,
    public _registerService: RegisterService) {

    this.initForms();

  }

  ngOnInit() {
    this._loginService.singOut();
  }

  //--------------------------------------------------------------------------------------
  //---------------------------------------Init Forms------------------------------------
  //--------------------------------------------------------------------------------------
  initForms() {
    this.initLoginForm();
    this.initRegisterForm();
    this.initResetPassword();
  }

  initLoginForm = () => {
    this.formGroupSession = this._formBuilderSession.group({
      email_session: ["", [Validators.required]],
      password_session: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  initRegisterForm = () => {
    this.formGroupRegister = this._formBuilderRegister.group({
      fullName_register: ["", [Validators.required]],
      email_register: ["", [Validators.required]],
      password_register: ["", [Validators.required, Validators.minLength(4)]]
    });
  }


  //--------------------------------------------------------------------------------------
  //------------------------------------Reset Password------------------------------------
  //--------------------------------------------------------------------------------------

  initResetPassword = () => {
    this.formGroupResetPassword = this._formBuilderResetPassword.group({
      email_reset: ["", [Validators.required]],
    });
  }


  resetPassword = () => {
    if (this.formGroupResetPassword.valid) {
      this._loginService.recovery(this.formGroupResetPassword.value.email_reset);
    } else {
      this._snotifyService.warning('Debe especificar un correo vailido', 'Atención');

    }
  }

  //--------------------------------------------------------------------------------------
  //--------------------------------------Register----------------------------------------
  //--------------------------------------------------------------------------------------
  register() {
    if (this.formGroupRegister.valid) {
      const user: UserType = {
        'profile_photo': '',
        'email': this.formGroupRegister.value.email_register,
        'name': this.formGroupRegister.value.fullName_register,
        'role': 'Viewer',
        'userId': null,
        'nationality': '',
        'description': '',
      }
      this._registerService.register(user, this.formGroupRegister.value.password_register);
    } else {
      this._snotifyService.warning('Nombre, Correo o contraseña incorrectos', 'No se puede guardar');
    }
  }

  //--------------------------------------------------------------------------------------
  //--------------------------------------Login--------------------------------------------
  //--------------------------------------------------------------------------------------

  login() {
    if (this.formGroupSession.valid) {

      this._loginService.login(this.formGroupSession.value.email_session, this.formGroupSession.value.password_session);
    
    } else {
      this._snotifyService.warning('Correo o contraseña incorrectos', 'Atención');
    }
  }


}
