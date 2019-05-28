import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserType;
  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.currentUser = this._loginService.getCurrentUser();
    }, 1000);

  }

}
