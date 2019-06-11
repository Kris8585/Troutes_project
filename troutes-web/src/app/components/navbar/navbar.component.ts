import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserType;
  stateSubscription: Subscription;
  state:string;
  route:string;
  constructor(private _loginService: LoginService,
              private _dataInformationService:DataInformationService) { 

    this.stateSubscription = this._dataInformationService.getState().subscribe((st) =>{
      this.state = st;
    });
  }

  ngOnDestroy(): void {
    if(this.stateSubscription){
      this.stateSubscription.unsubscribe();
    }
    
  }
  ngOnInit() {
    setTimeout(() => {
      this.currentUser = this._loginService.getCurrentUser();
      if(this.currentUser){
        this._dataInformationService.setState("MI PERFIL");
        this.route = '/secure/profile';
      }else{
        this._dataInformationService.setState("INICIAR SESIÓN");
        this.route = '/account/login';
      }
    }, 1000);

  }

}
