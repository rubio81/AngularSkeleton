import {Component, OnInit} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {LoginObject} from "../shared/login-object.model";
import {AuthenticationService} from "../shared/authentication.service";
import {StorageService} from "../../core/services/storage.service";
import {Router} from "@angular/router";
import {Session} from "../../core/models/session.model";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
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
    console.log('login on init');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.loading = true;
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => { this.correctLogin(data); },
        error => { console.log(error); this.error = JSON.parse(error); this.loading = false; }
      )
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/dashboard']);
  }
}
