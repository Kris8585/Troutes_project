import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  logUser: UserType;
  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.logUser = this._loginService.getCurrentUser();
  }

  callLogOut() {
    this._loginService.logout();
  }
}
