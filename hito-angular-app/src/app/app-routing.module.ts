import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './main/landing/landing.component';
import { LoginComponent } from './main/landing/login/login.component';
import { ForgotPasswordComponent } from './main/landing/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './main/landing/create-account/create-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LandingComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'create-account', component: CreateAccountComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
