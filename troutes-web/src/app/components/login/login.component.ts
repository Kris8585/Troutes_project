import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup; 

  constructor(private _loginService:LoginService, private _formBuilder:FormBuilder) {
    
    this.initForm(); 
   }

   login() {
     if(this.formGroup.valid){
 
      this._loginService.login(this.formGroup.value.email,this.formGroup.value.password);
     }else{ 
       alert("Correo o contraseña incorrectos");
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
