import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from 'src/app/login/shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;  

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router) { }
  
  ngOnInit() {
    console.log('header component on init');
    this.user = this.storageService.getCurrentUser();    
  }

  get isAuthenticated() { return this.authenticationService.isAuthenticated; }

  public logout(): void{    
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

  public resetPassword(): void{   
    console.log('reset-password'); 
    this.router.navigate(['/reset-password']);
  }

  public login():void{
    console.log('login'); 
    this.router.navigate(['/logi']);
  }
}
