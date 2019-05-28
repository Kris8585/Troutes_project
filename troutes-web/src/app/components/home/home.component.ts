import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login/login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  user: UserType;

 

  constructor(private _router: Router,
              private _loginService: LoginService) {

  }
  
  ngOnInit() {
    setTimeout(() => {
      this.user = this._loginService.getCurrentUser();
       if(!this.user){this._loginService.singOut();}
    }, 1000);

       
  
  }

  seePlace(namePlace: string) {
    // console.log(indice);
    //debugger;
    this._router.navigate(['secure/atractivo/', namePlace]);
  }
  

}
