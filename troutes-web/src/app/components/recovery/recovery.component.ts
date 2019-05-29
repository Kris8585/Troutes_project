import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  formGroup: FormGroup; 
  constructor(private _formBuilder:FormBuilder,
              private _loginService: LoginService,
              private _snotifyService: SnotifyService) { }

  ngOnInit() {
  }

  initForm = () => {
    this.formGroup = this._formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]] 
    }); 
  }

  recovery = () => {
    if(this.formGroup.valid){
      this._loginService.recovery(this.formGroup.value.email);
    }else{
      this._snotifyService.warning('Debe especificar un correo vailido', 'Atención'); 
   
    }
  }
}
