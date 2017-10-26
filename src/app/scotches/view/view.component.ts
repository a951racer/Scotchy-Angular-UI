import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ScotchesService } from '../scotches.service';
import { WishlistsService } from '../../wishlist/wishlists.service';
import { DatePipe } from '@angular/common';
// import { ConfirmDialog } from '../../../assets/partials/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-view-scotch',
  templateUrl: './view.template.html',
  styleUrls: ['./view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
     WishlistsService
   ]
})

export class ViewComponent implements OnInit, OnDestroy {
  user: any;
  scotch: any;
  notes: any[];
  tastings: any[];
  personalTastings: any[];
  thirdPartyTastings: any[];
  wishlists: any[];

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;
  title = 'Details';
  subtitle = 'Details';

  newNote: boolean;
  selectedNote: any;
  editedNote: any;

  selectedTasting: any;
  newTasting: boolean;
  editedTasting: any;

  newScotch: any;
  selectedScotch: any;
  editedScotch: any;

  selectedWishlist: any;
  newWishlist: boolean;
  editedWishlist: any;

  dialogTitle: string;
  prompt: string;

/*** Constructor ******************************************/

  constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _scotchesService: ScotchesService,
        private _wishlistsService: WishlistsService,
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
    this.fetchScotch();
  }

/*** Populate or refresh the data ************************/

  fetchScotch() {
    this.paramsObserver = this._route.params.subscribe(params => {
      const scotchId = params['scotchId'];

      this._scotchesService.read(scotchId).subscribe(scotch => {
        this.scotch = scotch;
        this.title = scotch.dramName;
        this.notes = scotch.notes;
        this.tastings = scotch.tastings;
        this.personalTastings = this.tastings.filter(tasting => !tasting.thirdParty);
        this.thirdPartyTastings = this.tastings.filter(tasting => tasting.thirdParty);
        this.wishlists = scotch.wishLists;
        this.allowEdit = (this.user && this.user._id === this.scotch.creator._id);
      },
      error => this._router.navigate(['scotches'])
    );
    });
  }

/*** Tabs **********************/

  openTab(tabId) {
    const tabs = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
    }
    const tabButtons = document.getElementsByClassName('tabButton');
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace('_activeTab', '_inactiveTab');
    }
    document.getElementById(tabId + 'Button').className = document.getElementById(tabId + 'Button')
                                                          .className.replace('_inactiveTab', '_activeTab');
    document.getElementById(tabId).style.display = 'block';
  }

/***  Notes  ****************/

  addNote() {
    this.newNote = true;
    this.editedNote = new Object();
    this._editDialogService.launchDialog({type: 'note',
                                            title: 'Add Note',
                                            editedObject: this.editedNote,
                                            doLaunch: true});
  }

  editNote(note: any) {
    this.newNote = false;
    this.selectedNote = note;
    this.editedNote = this.cloneNote(note);
    this._editDialogService.launchDialog({type: 'note',
                                            title: 'Edit Note',
                                            editedObject: this.editedNote,
                                            doLaunch: true});
  }

  confirmDeleteNote(bygoneNote: any) {
    this.selectedNote = bygoneNote;
    this._confirmDialogService.launchDialog({type: 'note',
                                            title: 'Delete Note',
                                            prompt: 'Do you want to delete this note?',
                                            doLaunch: true});
  }

  saveNote() {
    if (this.newNote) {
      this.newNote = false;
      this._scotchesService.addNote(this.scotch._id, this.editedNote).subscribe(scotch => {
        this.selectedNote = null;
        this.editedNote = null;
        this.fetchScotch();
      });
    } else {
      this._scotchesService.updateNote(this.scotch._id, this.editedNote).subscribe(scotch => {
        this.selectedNote = null;
        this.editedNote = null;
        this.fetchScotch();
      });
    }
  }

  cloneNote(n: any): any {
    const clonedNote = new Object();
    for (const prop of Object.keys(n)) {
      clonedNote[prop] = n[prop];
    }
    return clonedNote;
  }

  findSelectedNoteIndex(): number {
    return this.notes.indexOf(this.selectedNote);
  }

/***  Tastings  ******************/

  addTasting() {
    this.newTasting = true;
    this.editedTasting = new Object();
    this.editedTasting.thirdParty = false;
    // this.editedTasting.source = 'Self';
    this._editDialogService.launchDialog({type: 'tasting',
                                            title: 'Add Tasting',
                                            editedObject: this.editedTasting,
                                            doLaunch: true});
  }

  editTasting(tasting: any) {
    this.newTasting = false;
    this.selectedTasting = tasting;
    this.editedTasting = this.cloneTasting(tasting);
    this._editDialogService.launchDialog({type: 'tasting',
                                            title: 'Edit Tasting',
                                            editedObject: this.editedTasting,
                                            doLaunch: true});
  }

  confirmDeleteTasting(bygoneTasting: any) {
    this.selectedTasting = bygoneTasting;
    this._confirmDialogService.launchDialog({type: 'tasting',
                                            title: 'Delete Tasting',
                                            prompt: 'Do you want to delete this tasting?',
                                            doLaunch: true});
  }

  saveTasting() {
    if (this.newTasting) {
      this.newTasting = false;
      this._scotchesService.addTasting(this.scotch._id, this.editedTasting).subscribe(scotch => {
        this.selectedTasting = null;
        this.editedTasting = null;
        this.fetchScotch();
      });
    } else {
      this._scotchesService.updateTasting(this.scotch._id, this.editedTasting).subscribe(scotch => {
        this.selectedTasting = null;
        this.editedTasting = null;
        this.fetchScotch();
      });
    }
  }

  cloneTasting(t: any): any {
    const clonedTasting = new Object();
    for (const prop of Object.keys(t)) {
      clonedTasting[prop] = t[prop];
    }
    return clonedTasting;
  }


  findSelectedTastingIndex(): number {
    return this.tastings.indexOf(this.selectedTasting);
  }

/***  Wishlists  ****************/

  addWishlist() {
    this.newWishlist = true;
    this.editedWishlist = new Object();
    this._editDialogService.launchDialog({type: 'wishlist-select',
                                            title: 'Add Wish List',
                                            editedObject: this.editedWishlist,
                                            doLaunch: true});
  }

  confirmDeleteWishlist(bygoneWishlist: any) {
    this.selectedWishlist = new Object();
    this.selectedWishlist.wishListName = bygoneWishlist;
    this._confirmDialogService.launchDialog({type: 'wishlist',
                                            title: 'Delete Wish List',
                                            prompt: 'Do you want to delete wish list "' + bygoneWishlist + '"?',
                                            doLaunch: true});
  }

  saveWishlist() {
    if (this.newWishlist) {
      this.newWishlist = false;
      this._scotchesService.addWishlist(this.scotch._id, this.editedWishlist).subscribe(scotch => {
        this.selectedWishlist = null;
        this.editedWishlist = null;
        this.fetchScotch();
      });
    } else {
      /* preserved for future expansion
        this._scotchesService.updateWishlist(this.scotch._id, this.editedWishlist).subscribe(scotch => {
        this.selectedWishlist = null;
        this.editedWishlist = null;
        this.fetchScotch();
      }); */
    }
  }

  findSelectedWishlistIndex(): number {
    return this.wishlists.indexOf(this.selectedWishlist);
  }

  goToWishlist(wishListName: string) {
    this._wishlistsService.getWishlistId(wishListName).subscribe(fetchedWishlist => {
      this._router.navigate(['/wishlists', fetchedWishlist._id]);
    });
  }

/**** Scotch *********************/

  editScotch(scotch: any) {
    this.newScotch = false;
    this.selectedScotch = scotch;
    this.editedScotch = this.cloneScotch(scotch);
    this._editDialogService.launchDialog({type: 'scotch',
                                            title: 'Edit ' + scotch.dramName,
                                            editedObject: this.editedScotch,
                                            doLaunch: true});
  }

  cloneScotch(s: any): any {
    const clonedScotch = new Object();
    for (const prop of Object.keys(s)) {
      clonedScotch[prop] = s[prop];
    }
    return clonedScotch;
  }

  saveScotch() {
    this._scotchesService.update(this.editedScotch).subscribe(scotch => {
      this.fetchScotch();
    });
  }

/*** All record types  **************/

  saveRecord(response: any) {
    switch (response.type) {
      case 'note':
        this.saveNote();
        break;
      case 'tasting':
        this.saveTasting();
        break;
      case 'wishlist-select':
        this.saveWishlist();
        break;
      case 'scotch':
        this.saveScotch();
        break;
    }
  }

  deleteRecord(type: string) {
    switch (type) {
      case 'note':
        this._scotchesService.deleteNote(this.scotch._id, this.selectedNote).subscribe(scotch => {
          this.selectedNote = null;
          this.fetchScotch();
        });
        break;
      case 'tasting':
        this._scotchesService.deleteTasting(this.scotch._id, this.selectedTasting).subscribe(scotch => {
          this.selectedTasting = null;
          this.fetchScotch();
        });
        break;
      case 'wishlist':
        this._scotchesService.deleteWishlist(this.scotch._id, this.selectedWishlist).subscribe(scotch => {
          this.selectedWishlist = null;
          this.fetchScotch();
        });
        break;
    }
  }

/*** Misc **************/

  ngOnDestroy() {
    this.paramsObserver.unsubscribe();
  }
}
