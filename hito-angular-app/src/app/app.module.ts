import { UserState } from './shared/state-management/user.state';
import { PaginationState } from './shared/state-management/pagination.state';
import { ForgotPasswordComponent } from './core/landing/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './core/landing/create-account/create-account.component';
import { LandingComponent } from './core/landing/landing.component';
import { LoginComponent } from './core/landing/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthState } from './shared/state-management/auth.state';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { MainComponent } from './core/main/main.component';
import { ErrorState } from './shared/state-management/error.state';
import { NavbarComponent } from './core/main/navbar/navbar.component';
import { UserListComponent } from './core/main/user-list/user-list.component';
import { ScrollableDirective } from './shared/directives/scrollable.directive';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ChatComponent } from './core/main/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    MainComponent,
    NavbarComponent,
    UserListComponent,
    ScrollableDirective,
    LoadingComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      AuthState, ErrorState, PaginationState, UserState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [AuthState, ErrorState, PaginationState, UserState]
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
