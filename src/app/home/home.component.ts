import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { EditDialogService } from '../../assets/partials/edit-dialog/edit-dialog.service';
import { ConfirmDialogService } from '../../assets/partials/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.template.html',
  styleUrls: ['./home.component.css'],
  providers: [EditDialogService,
             ConfirmDialogService]
})

export class HomeComponent {
  title = 'Scotchy';
  subtitle = 'A fair bonnie app for managing a lad or lassie\'s scotching';
  user: any;
  authenticated: boolean;
  errorMessage: any;

    constructor (private _authenticationService: AuthenticationService,
                  public _editDialogService: EditDialogService,
                  public _confirmDialogService: ConfirmDialogService,
                  private _router: Router) {
      this.user = _authenticationService.user;
      this.authenticated = _authenticationService.isLoggedIn();

      _editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          if (response.type === 'signin') {
              this._authenticationService.signin(this.user).subscribe(
                result  => {
                              this.authenticated = true;
                              this.user = result;
                              console.log(this.authenticated);
                              console.log(this.user);
                              this._router.navigate(['/scotches']);
                            },
                error => {
                              this.authenticated = false;
                              this.errorMessage = error;
                          });

            } else {
              if (response.type === 'signup') {
                this._authenticationService.signup(this.user).subscribe(
                  result  => {
                                this.authenticated = true;
                                this._router.navigate(['/']);
                              },
                  error =>  {
                                this.authenticated = false;
                                this.errorMessage = error;
                            });
              }
            }
        }
      });

      _confirmDialogService.dialogResponded.subscribe(
        response => {
        if (response.confirmed) {
          this._authenticationService.signout().subscribe(result  =>
                            this._router.navigate(['/']), error =>  this.errorMessage = error);
          window['user'] = null;
          this.user = null;
          this.authenticated = false;
        }
      });

    }

  login() {
    this.user = new Object();
    this._editDialogService.launchDialog({type: 'signin',
                                            title: 'Sign In',
                                            editedObject: this.user,
                                            doLaunch: true});
  }

  signUp() {
    this.user = new Object();
    this._editDialogService.launchDialog({type: 'signup',
                                            title: 'Register',
                                            editedObject: this.user,
                                            doLaunch: true});
  }

  signOut() {
    this._confirmDialogService.launchDialog({type: 'signout',
                                            title: 'Sign out',
                                            prompt: 'Are you sure you want to sign out?',
                                            doLaunch: true});
  }

  onClick(buttonName) {
    switch (buttonName) {
      case 'Home': this._router.navigate(['/']);
        break;
      case 'Cabinet': this._router.navigate(['scotches']);
        break;
      case 'Wishlists': this._router.navigate(['wishlists']);
        break;
      case 'Tastings': this._router.navigate(['tastings']);
        break;
      case 'Prices':
        console.log('nav prices - bar');
        this._router.navigate(['prices']);
        break;
    }
  }
}
