import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmDialogService } from '../../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../../assets/partials/edit-dialog/edit-dialog.service';
import { ScotchesService } from '../../scotches.service';
import { WishlistsService } from '../../../wishlist/wishlists.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlists-table',
  templateUrl: './wishlists-table.template.html',
  styleUrls: ['../view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
     WishlistsService
   ]
})

export class WishlistsTableComponent implements OnInit {
  @Input() wishlists: any[];
  @Input() scotch: any;
  @Output() refreshNeeded: EventEmitter<string> = new EventEmitter();

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;

  newWishlist: boolean;
  selectedWishlist: any;
  editedWishlist: any;

  dialogTitle: string;
  prompt: string;


  constructor(private _router: Router,
              private _scotchesService: ScotchesService,
              private _wishlistsService: WishlistsService,
              private _editDialogService: EditDialogService,
              private _confirmDialogService: ConfirmDialogService) {}


  ngOnInit() {
    /** handle delete confirmation dialog repsonses **/
    this._confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this._scotchesService.deleteWishlist(this.scotch._id, this.selectedWishlist.wishListName).subscribe(scotch => {
          this.selectedWishlist = null;
          this.refreshNeeded.emit('wishlists');
          });
        }
      });

    /** handle edit dialog repsonses **/
    this._editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          if (this.newWishlist) {
            this.newWishlist = false;
            this._scotchesService.addWishlist(this.scotch._id, this.editedWishlist).subscribe(scotch => {
              this.selectedWishlist = null;
              this.editedWishlist = null;
              this.refreshNeeded.emit('wishlists');
            });
          } else {
/*            this._scotchesService.updateWishlist(this.scotch._id, this.editedWishlist).subscribe(scotch => {
              this.selectedWishlist = null;
              this.editedWishlist = null;
              this.refreshNeeded.emit('wishlists');
            });
*/          }
        }
      });
  }

/***  Wishlists  ****************/

  addWishlist() {
    this.newWishlist = true;
    this.editedWishlist = new Object();
    this._editDialogService.launchDialog({type: 'wishlist-select',
                                            title: 'Add Wishlist',
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  editWishlist(wishlist: any) {
    this.newWishlist = false;
    this.selectedWishlist = wishlist;
    this.editedWishlist = this.cloneWishlist(wishlist);
    this._editDialogService.launchDialog({type: 'wishlist',
                                            title: 'Edit Wishlist',
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  confirmDeleteWishlist(bygoneWishlist: any) {
    this.selectedWishlist = bygoneWishlist;
    this._confirmDialogService.launchDialog({type: 'wishlist',
                                            title: 'Delete Wishlist',
                                            prompt: 'Do you want to delete "' + this.selectedWishlist.wishListName + '"?',
                                            doLaunch: true});
  }

  cloneWishlist(n: any): any {
    const clonedWishlist = new Object();
    for (const prop of Object.keys(n)) {
      clonedWishlist[prop] = n[prop];
    }
    return clonedWishlist;
  }

  navigate(link: any) {
    this._wishlistsService.getWishlistId(link.id).subscribe(wishlistId => {
      this._router.navigate([link.link, wishlistId._id]);
    });
  }
}
