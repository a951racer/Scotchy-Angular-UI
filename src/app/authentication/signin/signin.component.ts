import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.template.html',
    styleUrls: [ ]
})

export class SigninComponent {
  errorMessage: string;
  credentials: any = {};
  title = 'Sign In';
  subtitle = 'Welcome Back!';

  constructor (private _authenticationService: AuthenticationService, private _router: Router) {   }

  signin() {
    this._authenticationService.signin(this.credentials).subscribe(result  =>
      this._router.navigate(['/scotches']), error => this.errorMessage = error );
  }
}
