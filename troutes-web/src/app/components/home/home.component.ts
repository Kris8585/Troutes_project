import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { LoginService } from 'src/app/services/login/login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  attractions$: Observable<any>;
  
  user: UserType;

  constructor(private _router: Router,
              private _loginService: LoginService,
              private _dataInformationService:DataInformationService) {
  this.attractions$ = this._dataInformationService.getAllAttractions();
 
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = this._loginService.getCurrentUser();
      

      if (!this.user) {
        this._loginService.singOut();
       
      }
    }, 1000);

  }



  seePlace(namePlace: string) {
    this._router.navigate(['public/details/', namePlace]);
  }


}
