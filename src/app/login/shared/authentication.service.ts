import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { LoginObject } from './login-object.model';
import { Session } from 'src/app/core/models/session.model';
import { ResetPasswordObject } from './reset-password-object.model';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public isAuthenticated: boolean;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private basePath = '/api/authenticate/';

  public get currentUserName(){    
    return this.currentUserSubject.value.user.username;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginObj: LoginObject): Observable<Session>{
    console.log('authenticationService.login');
    this.isAuthenticated = true;
    return this.http.post<Session>(this.basePath + 'login', loginObj);
  }

  logout(): Observable<Boolean>{
    this.isAuthenticated = false;
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }

  resetPassword(resetPasswordObj: ResetPasswordObject): Observable<Session>{
    console.log('authenticationService.resetPassword');
    return this.http.post<Session>(this.basePath + 'resetPassword', resetPasswordObj);
  }
}
