import { LoadingComponent } from './../../shared/components/loading/loading.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollableDirective } from 'src/app/shared/directives/scrollable.directive';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    UserListComponent,
    ChatComponent,
    LoadingComponent,
    ScrollableDirective,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MainModule { }
