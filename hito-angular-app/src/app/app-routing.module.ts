import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialComponent } from './main/initial/initial.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: InitialComponent,  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
