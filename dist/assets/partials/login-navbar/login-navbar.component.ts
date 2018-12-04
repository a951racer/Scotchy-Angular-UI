import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-navbar',
  templateUrl: 'login-navbar.component.html'
})

export class LoginNavbarComponent {
  constructor(private router: Router) { }

  onSigninClick() {
    this.router.navigate(['authentication/signin']);
  }

  onSignupClick() {
      this.router.navigate(['authentication/signup']);
  }
}
