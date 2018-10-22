import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class IsAdminService implements CanActivate {


  constructor(private authenticationService: AuthenticationService, private router: Router, private location: Location) {
  }

  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   const userRole = this.authenticationService.getUserRole();
  //   console.log(userRole);
  //   if (userRole == null) {
  //     this.location.back();
  //     return false;
  //   }
  //   if (userRole !== 'ADMIN') {
  //     this.location.back();
  //     return false;
  //   }
  //
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.authenticationService.getUserRole();
    console.log(userRole);
    if (userRole == null) {
      this.location.back();
      return false;
    }
    if (userRole !== 'ADMIN') {
      this.location.back();
      return false;
    }

    return true;
  }


}
