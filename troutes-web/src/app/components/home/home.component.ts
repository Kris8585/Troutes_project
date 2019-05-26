import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login/login.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newsSubscription : Subscription;
  newId : string;
  attractions$: Observable<any>;
  editor$: Observable<any>;
  user: UserType;

  constructor(private _dataInformationService:DataInformationService,
              private _loginService: LoginService) {
    this.attractions$ = _dataInformationService.getAllAttractions();
    this.editor$ = _dataInformationService.getUserByRole('Editor');
    }

  ngOnInit() {
    setTimeout(() => {
      this.user = this._loginService.getCurrentUser();
    }, 1000);
  }

  

}
