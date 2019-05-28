import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  logUser: UserType;
  constructor(
    private _router: Router,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.logUser = this._loginService.getCurrentUser();
  }

  callLogOut() {
    this._loginService.logout();
  }
  goToHome() {
    this._router.navigateByUrl('/public/home');
  }
}
