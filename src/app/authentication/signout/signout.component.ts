import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-signout',
    templateUrl: 'signout.template.html'
})

export class SignoutComponent {
  errorMessage: string;
  title = 'Sign Out';
  subtitle = 'Au revoir!';
  // credentials: any = {};

  constructor (private _authenticationService: AuthenticationService, private _router: Router) {   }

  signout() {
    this._authenticationService.signout().subscribe(result  => this._router.navigate(['/']), error =>  this.errorMessage = error);
    window['user'] = null;
  }
}
