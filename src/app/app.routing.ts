import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login/login.component";
import { AuthorizatedGuard } from "./core/guards/authorizated.guard";
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ AuthorizatedGuard ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/'},  
];

export const Routing = RouterModule.forRoot(appRoutes);
