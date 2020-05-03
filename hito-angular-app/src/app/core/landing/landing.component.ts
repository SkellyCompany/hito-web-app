import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { Router } from '@angular/router';
import { routingConstants } from 'src/app/shared/constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.loggedInUser$ !== undefined) {
      this.router.navigate(['/' + routingConstants.app]);
    }
  }
}
