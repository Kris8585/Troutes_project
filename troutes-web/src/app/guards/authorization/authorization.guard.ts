import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { SnotifyService } from 'ng-snotify';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { disableBindings } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  attractionName: string;
  attractionObjectSuscription: Subscription;
  authorizedUser: string;

  constructor(private _loginService: LoginService,
    private _snotifyService: SnotifyService,
    private _dataInformationService: DataInformationService,
    private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._loginService.checkCurrentUserRole(route.data.role)) {
      return true;
    } else {
      this._snotifyService.warning('No tiene los permisos necesarios para realizar esta acción', 'Atención');
      return false;
    }

  }







}
