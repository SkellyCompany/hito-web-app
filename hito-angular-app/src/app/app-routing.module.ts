import { routingConstants } from './shared/constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LandingComponent } from './core/landing/landing.component';
import { LoginComponent } from './core/landing/login/login.component';
import { CreateAccountComponent } from './core/landing/create-account/create-account.component';
import { ForgotPasswordComponent } from './core/landing/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: routingConstants.login, pathMatch: 'full' },
  { path: '', component: LandingComponent,
    children: [
      { path: routingConstants.login, component: LoginComponent},
      { path: routingConstants.createAccount, component: CreateAccountComponent},
      { path: routingConstants.forgotPassword, component: ForgotPasswordComponent}
  ]},
  {
    path: routingConstants.app,
    loadChildren: () => import('./core/main/main.module').then(m => m.MainModule)
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
