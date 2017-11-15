import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { WishlistsService } from '../wishlists.service';
import { ScotchesService } from '../../scotches/scotches.service';
import { DatePipe } from '@angular/common';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view.template.html',
  styleUrls: ['./view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
     ScotchesService
   ]
})

export class ViewComponent implements OnInit, OnDestroy {
  user: any;
  wishlist: any;
  scotches: any[];

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;
  title = 'Details';
  subtitle = 'Details';

  newScotch: boolean;
  selectedScotch: any;
  editedScotch: any;

  newWishlist: boolean;
  selectedWishlist: any;
  editedWishlist: any;

  dialogTitle: string;
  prompt: string;

/*** Constructor ******************************************/

  constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _wishlistsService: WishlistsService,
        private _scotchesService: ScotchesService,
        private _confirmDialogService: ConfirmDialogService,
        private _editDialogService: EditDialogService) {

    /** handle delete confirmation dialog repsonses **/
    _confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this.deleteRecord(response.type);
        }
      });

    /** handle edit dialog repsonses **/
    _editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this.saveRecord(response);
        }
      });
  }

/*** Initialization **************************************/

  ngOnInit() {
    this.user = this._authenticationService.user;
    this.fetchWishlist();
  }

/*** Populate or refresh the data ************************/

  fetchWishlist() {
    this.paramsObserver = this._route.params.subscribe(params => {
      const wishlistId = params['wishlistId'];

      this._wishlistsService.read(wishlistId).subscribe(result => {
        this.wishlist = result.wishlist;
        this.scotches = result.scotches;
        this.allowEdit = (this.user && this.user._id === this.wishlist.creator._id);
      },
      error => this._router.navigate(['wishlists'])
    );
    });
  }

/***  Scotches  ****************/

  addScotch() {
    this.newScotch = true;
    this.editedScotch = new Object();
    this._editDialogService.launchDialog({type: 'scotch-select',
                                            title: 'Add Scotch',
                                            editedObject: this.editedScotch,
                                            doLaunch: true});
  }

/** hold pending removal ***
  editNote(note: any) {
    this.newNote = false;
    this.selectedNote = note;
    this.editedNote = this.cloneNote(note);
    this._editDialogService.launchDialog({type: 'note',
                                            title: 'Edit Note',
                                            editedObject: this.editedNote,
                                            doLaunch: true});
  }
*/

  confirmDeleteScotch(bygoneScotch: any) {
    this.selectedScotch = bygoneScotch;
    this._confirmDialogService.launchDialog({type: 'scotch',
                                            title: 'Delete Scotch',
                                            prompt: 'Do you want to delete "' + this.selectedScotch.dramName + '"?',
                                            doLaunch: true});
  }

  saveScotch() {
    if (this.newScotch) {
      this.newScotch = false;
      this._scotchesService.addWishlist(this.editedScotch._id, this.wishlist).subscribe(scotch => {
        this.selectedScotch = null;
        this.editedScotch = null;
        this.fetchWishlist();
      });
    } else {
      /* pending removal ****
      this._scotchesService.updateNote(this.scotch._id, this.editedNote).subscribe(scotch => {
        this.selectedNote = null;
        this.editedNote = null;
        this.fetchScotch();
      }); */
    }
  }

  /* Pending removal  ***
  cloneScotch(s: any): any {
    const clonedScotch = new Object();
    for (const prop of Object.keys(s)) {
      clonedScotch[prop] = s[prop];
    }
    return clonedNote;
  }
*/

  findSelectedScotchIndex(): number {
    return this.scotches.indexOf(this.selectedScotch);
  }


/**** Wishlist *********************/

  editWishlist(wishlist: any) {
    this.newWishlist = false;
    this.selectedWishlist = wishlist;
    this.editedWishlist = this.cloneWishlist(wishlist);
    this._editDialogService.launchDialog({type: 'wishlist',
                                            title: 'Edit ' + wishlist.wishListName,
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  cloneWishlist(w: any): any {
    const clonedWishlist = new Object();
    for (const prop of Object.keys(w)) {
      clonedWishlist[prop] = w[prop];
    }
    return clonedWishlist;
  }

  saveWishlist() {
    this._wishlistsService.update(this.editedWishlist).subscribe(wishlist => {
      this.fetchWishlist();
    });
  }

/*** All record types  **************/

  saveRecord(response: any) {
    switch (response.type) {
      case 'wishlist':
        this.saveWishlist();
        break;
      case 'scotch-select':
        this.saveScotch();
        break;
    }
  }

  deleteRecord(type: string) {
    switch (type) {
      case 'scotch':
        this._scotchesService.deleteWishlist(this.selectedScotch._id, this.wishlist).subscribe(scotch => {
          this.selectedWishlist = null;
          this.fetchWishlist();
        });
        break;
    }
  }

/*** Misc **************/

  ngOnDestroy() {
    this.paramsObserver.unsubscribe();
  }

  navigate(link: any) {
    this._router.navigate([link.link, link.id]);
  }

}
