import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroupSession: FormGroup;
  public formGroupRegister: FormGroup;
  public formGroupResetPassword: FormGroup;


  constructor(private _loginService: LoginService,
    private _formBuilderSession: FormBuilder,
    private _formBuilderRegister: FormBuilder,
    private _formBuilderResetPassword: FormBuilder,
    private _snotifyService: SnotifyService) {

    this.initForms();

  }

  login() {
    if (this.formGroupSession.valid) {
      this._loginService.login(this.formGroupSession.value.email_session, this.formGroupSession.value.password_session);
    } else {
      this._snotifyService.warning('Correo o contraseña incorrectos', 'Atención');
    }
  }

  ngOnInit() {
    this._loginService.singOut();
  }

  //Creado Cris
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

  initResetPassword = () => {
    this.formGroupResetPassword = this._formBuilderResetPassword.group({
      email_reset: ["", [Validators.required]],
    });
  }

  register() {
    if (this.formGroupRegister.valid) {
      //this._loginService.login(this.formGroup.value.email,this.formGroup.value.password);
    } else {
      //this.snotifyService.warning('Correo o contraseña incorrectos', 'Atención'); 
    }
  }


  resetPassword = () => {
    if (this.formGroupResetPassword.valid) {
      this._loginService.recovery(this.formGroupResetPassword.value.email_reset);
    } else {
      this._snotifyService.warning('Debe especificar un correo vailido', 'Atención');

    }
  }

}
