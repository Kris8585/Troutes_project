import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate  {

  path: ActivatedRouteSnapshot[]; 
  route: ActivatedRouteSnapshot;
  
  constructor(private _loginService: LoginService, private _snotifyService:SnotifyService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
 if(this._loginService.getCurrentUserRole(route.data.role) ){
   return true ;
 }else{
   this._snotifyService.warning('No tiene los permisos necesarios para realizar esta acción', 'Atención'); 
   return false;
 }
    
  }

  
}
