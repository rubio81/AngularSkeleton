import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService){}

  canActivate(){
    //console.log(this.storageService.isAuthenticated());
    console.log('guard can activate');
    if (this.storageService.isAuthenticated()){
      console.log('true');
      //logged in so return true
      return true;
    }

    //not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
  
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
