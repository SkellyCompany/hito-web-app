import { AuthGuard } from './shared/auth-guard/auth.guard';
import { MainComponent } from './core/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LandingComponent } from './core/landing/landing.component';
import { LoginComponent } from './core/landing/login/login.component';
import { CreateAccountComponent } from './core/landing/create-account/create-account.component';
import { ForgotPasswordComponent } from './core/landing/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LandingComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'create-account', component: CreateAccountComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent}
  ]},
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
