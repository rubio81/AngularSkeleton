import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { Session } from '../../core/models/session.model';
import { ResetPasswordObject } from '../shared/reset-password-object.model';
import { PasswordMatchValidator } from '../shared/password-validator';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  loading = false;
  returnUrl: string;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { 
                 // redirect to home if already logged in
                // if (this.authenticationService.currentUserValue) { 
                //   this.router.navigate(['/']);
                // }
          }

  ngOnInit() {
    console.log('reset password component');
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, {validator: PasswordMatchValidator});    
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  public submitResetPassword(): void {
    console.log('submit reset password');
    this.submitted = true;
    this.error = null;
    if(this.resetPasswordForm.valid){
      this.loading = true;
      var resetPasswordObject = new ResetPasswordObject(this.resetPasswordForm.value);
      resetPasswordObject.username = this.authenticationService.currentUserName;
      this.authenticationService.resetPassword(resetPasswordObject).subscribe(
        data => { this.correctLogin(data); },
        error => { console.log(error); this.error = JSON.parse(error); this.loading = false; }
      )
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/dashboard']);
  }

  onPasswordInput() {
    if (this.resetPasswordForm.hasError('passwordMismatch'))
      this.f.confirmNewPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.f.confirmNewPassword.setErrors(null);
  }
}
