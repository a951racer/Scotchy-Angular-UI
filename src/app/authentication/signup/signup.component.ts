import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.template.html'
})

export class SignupComponent {
  errorMessage: string;
  user: any = {};
  title = 'Sign Up';
  subtitle = 'Hello new friend';

  constructor (private _authenticationService:
                AuthenticationService,
                private _router: Router) {}

  signup() {
    this._authenticationService.signup(this.user)
      .subscribe(result  => this._router.navigate(['/']), error =>  this.errorMessage = error);
  }
}
