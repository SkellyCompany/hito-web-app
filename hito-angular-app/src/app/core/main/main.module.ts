import { LoadingComponent } from './../../shared/components/loading/loading.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollableDirective } from 'src/app/shared/directives/scrollable.directive';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    ChatListComponent,
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
