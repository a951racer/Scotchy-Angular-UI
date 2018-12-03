import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Router } from '@angular/router';
import { WishlistsService } from './wishlists.service';

@Component({
  selector: 'app-wishlist-select-form',
  templateUrl: './wishlist-select-form-component.html',
  providers: [WishlistsService]
})

export class WishlistSelectFormComponent implements OnInit {
  @Input() wishlist: any;
  wishlists: any[];

  constructor(private _wishlistsService: WishlistsService) {}

  ngOnInit() {
    this._wishlistsService.list().subscribe(wishlists => {
      this.wishlists = wishlists;
    });
  }
}
