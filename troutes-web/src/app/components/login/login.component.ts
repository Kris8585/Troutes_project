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
  /*   private formBuilderSession: FormBuilder;
    private formBuilderRegister: FormBuilder;
    private formBuilderResetPassword: FormBuilder; */

  formGroup: FormGroup;

  constructor(private _loginService: LoginService,
    //private _formBuilder: FormBuilder,
    private formBuilderSession: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private formBuilderResetPassword: FormBuilder,
    private _snotifyService: SnotifyService) {

    /*  this.formBuilderSession = new FormBuilder();
     this.formBuilderRegister=new FormBuilder();
     this.formBuilderResetPassword=new FormBuilder(); */
    this.initForms();
    //this.initForm();
  }

  login() {
    if (this.formGroup.valid) {
      this._loginService.login(this.formGroup.value.email, this.formGroup.value.password);
    } else {
      this._snotifyService.warning('Correo o contraseña incorrectos', 'Atención');
    }
  }

  /* initForm = () => {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  } */
  ngOnInit() {
  }

  //Creado Cris
  initForms() {
    this.initLoginForm();
    this.initRegisterForm();
    this.initResetPassword();
  }

  initLoginForm = () => {
    this.formGroupSession = this.formBuilderSession.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  initRegisterForm = () => {
    this.formGroupRegister = this.formBuilderRegister.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  initResetPassword = () => {
    this.formGroupResetPassword = this.formBuilderResetPassword.group({
      email: ["", [Validators.required]],
    });
  }

  /* login() {
    if (this.formGroupSession.valid) {
      //this._loginService.login(this.formGroup.value.email,this.formGroup.value.password);
    } else {
      //this.snotifyService.warning('Correo o contraseña incorrectos', 'Atención'); 
    }
  } */

  register() {
    if (this.formGroupRegister.valid) {
      //this._loginService.login(this.formGroup.value.email,this.formGroup.value.password);
    } else {
      //this.snotifyService.warning('Correo o contraseña incorrectos', 'Atención'); 
    }
  }

  resetPassword() {
    if (this.formGroupResetPassword.valid) {
      //this._loginService.login(this.formGroup.value.email,this.formGroup.value.password);
    } else {
      //this.snotifyService.warning('Correo o contraseña incorrectos', 'Atención'); 
    }
  }

}
