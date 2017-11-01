import { Component, Input, OnInit, Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// import { MenuModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['page-header.component.css']
})


export class PageHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  showMenu = (this.router.url.substr(1, 8) === 'scotches'
             || this.router.url.substr(1, 9) === 'wishlists'
             || this.router.url.substr(1, 7) === 'lookups'
             || this.router.url.substr(1, 8) === 'tastings');



  // private items: MenuItem[];

  constructor (private router: Router) {}

  menuClick() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  onSelect(buttonName) {
    switch (buttonName) {
      case 'home': this.router.navigate(['/']);
        break;
      case 'cabinet': this.router.navigate(['scotches']);
        break;
      case 'wishlists': this.router.navigate(['wishlists']);
        break;
      case 'tastings': this.router.navigate(['tastings']);
        break;
      case 'settings': this.router.navigate(['lookups']);
        break;
      case 'signout': this.router.navigate(['authentication/signout']);
        break;
    }
  }

  close() {
    document.getElementById('myDropdown').classList.remove('show');
  }
 }
