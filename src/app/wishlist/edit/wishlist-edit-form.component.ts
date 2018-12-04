import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-edit-form',
  templateUrl: './wishlist-edit-form.template.html',
})

export class WishlistEditFormComponent {
  @Input() wishlist: any;
}
