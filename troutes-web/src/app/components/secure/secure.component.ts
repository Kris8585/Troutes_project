import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';
@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  logUser: UserType;
  @ViewChild('drawer') drawer: MatDrawer;
  generalActions: any[] = [
    { name: 'Perfil', description: 'Ver Perfil', link: '/secure/profile', role: '' },
    { name: 'Atractivos Editor', description: 'Editor Atractivos', link: '/secure/attraction-editor', role: 'Editor' },
    { name: 'Noticias Control', description: 'Editor de noticias', link: '/secure/news-admin', role: 'Admin' },
    { name: 'Atractivos Asignador', description: 'Editor de noticias', link: '/secure/assing-editor', role: 'Admin' },
  ];
  constructor(private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.logUser = this._loginService.getCurrentUser();
  }

  callLogOut() {
    this._loginService.logout();
  }
  goToHome() {
    this._router.navigateByUrl('/public/home');
  }
  gotoRoute(route: string) {
    this._router.navigateByUrl(route);
  }
}
