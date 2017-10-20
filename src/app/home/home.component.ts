import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.template.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'Scotchy';
  subtitle = 'A fair bonnie app for managing a lad or lassie\'s scotching';
  user: any;

    constructor (private _authenticationService: AuthenticationService) {
        this.user = _authenticationService.user;
    }
}
