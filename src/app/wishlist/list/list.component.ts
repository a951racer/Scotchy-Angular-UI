import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistsService } from '../wishlists.service';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-list-wishlsts',
  templateUrl: './list.template.html',
  styleUrls: ['./list.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService
   ]
})

export class ListComponent implements OnInit {
  wishlists: any;
  errorMessage: string;
  title = 'Wish Lists';
  subtitle = 'Current Lists';
  displayDialog: boolean;
  confirmDialgo: boolean;
  selectedWishlist: any;
  editedWishlist: any;
  newWishlist: boolean;
  dialogTitle: string;
  confirmDialogTitle: string;

  constructor(private _wishlistsService: WishlistsService,
              private _router: Router,
              private _confirmDialogService: ConfirmDialogService,
              private _editDialogService: EditDialogService) {

    /** handle delete confirmation dialog repsonses **/
    _confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this.delete();
        }
      });

    /** handle edit dialog repsonses **/
    _editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
              this.save();
        }
      });
}

  ngOnInit() {
    this._wishlistsService.list().subscribe(wishlists  => this.wishlists = wishlists);
  }

  addWishlist() {
    this.newWishlist = true;
    this.editedWishlist = new Object();
    this._editDialogService.launchDialog({type: 'wishlist',
                                            title: 'Add Wishlist',
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  editWishlist(wishlist: any) {
    this.newWishlist = false;
    this.selectedWishlist = wishlist;
    this.editedWishlist = this.cloneWishlist(wishlist);
    this._editDialogService.launchDialog({type: 'wishlist',
                                            title: 'Edit ' + wishlist.name,
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  confirmDeleteWishlist(bygoneWishlist: any) {
    this.selectedWishlist = bygoneWishlist;
    this._confirmDialogService.launchDialog({type: 'wishlist',
                                            title: 'Delete Wishlist',
                                            prompt: 'Do you want to delete "' + bygoneWishlist.wishListName + '"?',
                                            doLaunch: true});
  }

  cloneWishlist(w: any): any {
    const clonedWishlist = new Object();
    for (const prop of Object.keys(w)) {
      clonedWishlist[prop] = w[prop];
    }
    return clonedWishlist;
  }

  save() {
    const newWishlists = [...this.wishlists];
    if (this.newWishlist) {
      this.newWishlist = false;
      this._wishlistsService.create(this.editedWishlist).subscribe(wishlist => {
        newWishlists.push(wishlist);
        this.wishlists = newWishlists;
        this.selectedWishlist = null;
        this.editedWishlist = null;
      });
    } else {
      this._wishlistsService.update(this.editedWishlist).subscribe(wishlist => {
        const index = this.findSelectedWishlistIndex();
        newWishlists[index] = wishlist;
        this.wishlists = newWishlists;
        this.selectedWishlist = null;
        this.editedWishlist = null;
      });
    }
  }

  delete() {
    this._wishlistsService.delete(this.selectedWishlist._id).subscribe(wishlist => {
      const index = this.findSelectedWishlistIndex();
      this.wishlists = this.wishlists.filter((val, i) => i !== index);
      this.selectedWishlist = null;
    });
  }

  findSelectedWishlistIndex(): number {
    return this.wishlists.indexOf(this.selectedWishlist);
  }

  showDetails(wishlist) {
    this._router.navigate(['/wishlists', wishlist._id]);
  }
}
