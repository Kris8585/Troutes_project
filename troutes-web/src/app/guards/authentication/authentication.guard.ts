import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'; 
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  path: ActivatedRouteSnapshot[]; 
  route: ActivatedRouteSnapshot;
  
  constructor(private _angularFireAuth: AngularFireAuth,
              private _router: Router, 
              private _loginService:LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return new Observable(observer => {
      if (this._angularFireAuth.auth.currentUser) { 
        observer.next(true);
      }
      else {
        this._router.navigateByUrl('/account/login');
        observer.next(false);
      }
    })

  }

}
