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
  formGroup: FormGroup;

  constructor(private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _snotifyService: SnotifyService) {

    this.initForm();
  }

  login() {
    if (this.formGroup.valid) {
      this._loginService.login(this.formGroup.value.email, this.formGroup.value.password);
      console.log(this._loginService.getCurrentUser());
    } else {
      this._snotifyService.warning('Correo o contraseña incorrectos', 'Atención');
    }
  }

  initForm = () => {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }

}
