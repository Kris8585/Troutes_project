import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';

import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;



  constructor(private _formBuilder: FormBuilder,
              private _registerService: RegisterService, 
              private _snotifyService: SnotifyService) {

    this.initForm();
    
  }

  ngOnInit() {
  }

  initForm = () => {
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      description: ['', [Validators.required]],
      profile_photo: ['', [Validators.required]]
    });
  }

  register() {
    if (this.formGroup.valid) {
      const user: UserType = {
        'userId': null,
        'name': this.formGroup.value.name,
        'nationality': this.formGroup.value.nationality,
        'description': this.formGroup.value.description,
        'followed_sites': null,
        'email': this.formGroup.value.email,
        'role': 'Viewer',
        'profile_photo': this.formGroup.value.profile_photo
      }
      this._registerService.register(user, this.formGroup.value.password);

    } else {
      this._snotifyService.warning('Nombre, Correo o contraseña incorrectos', 'No se puede guardar'); 
    }
  }





}
