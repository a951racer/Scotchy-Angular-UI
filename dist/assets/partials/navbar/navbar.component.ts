import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
  constructor(private router: Router) { }

  onClick(buttonName) {
    switch (buttonName) {
      case 'Home': this.router.navigate(['/']);
        break;
      case 'Cabinet': this.router.navigate(['scotches']);
        break;
      case 'Wishlists': this.router.navigate(['wishlists']);
        break;
      case 'Tastings': this.router.navigate(['tastings']);
        break;
      case 'Prices':
        console.log('nav prices - bar');
        this.router.navigate(['prices']);
        break;
      case 'Sign-Out': this.router.navigate(['authentication/signout']);
        break;
    }
  }
}
