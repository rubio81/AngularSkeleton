import { Component, OnInit } from "@angular/core";
import { StorageService } from "../core/services/storage.service";
import { User } from "../core/models/user.model";
import { AuthenticationService } from "../login/shared/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // public user: User;
   public isAuthenticated: boolean;

  constructor( ) { }
  // constructor(
  //   private storageService: StorageService,
  //   private authenticationService: AuthenticationService,
  //   private router: Router) { }
  
   ngOnInit() {
  //   console.log('home component on init');
  //   this.user = this.storageService.getCurrentUser();
  //   this.isAuthenticated = true;
   }

  // public logout(): void{
  //   this.isAuthenticated = false;
  //   this.authenticationService.logout().subscribe(
  //       response => {if(response) {this.storageService.logout();}}
  //   );
  // }

  // public resetPassword(): void{   
  //   console.log('reset-password'); 
  //   this.router.navigate(['/reset-password']);
  // }  
}
