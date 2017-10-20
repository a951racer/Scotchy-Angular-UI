import { Component } from '@angular/core';
import { WishlistsService } from './wishlists.service';

@Component({
  selector: 'app-wishlists',
  template: '<router-outlet></router-outlet>',
  providers: [WishlistsService]
})

export class WishlistsComponent {}
