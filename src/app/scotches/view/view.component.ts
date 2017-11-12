import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ScotchesService } from '../scotches.service';
// import { WishlistsService } from '../../wishlist/wishlists.service';
// import { PricesService } from '../../price/price.service';
import { DatePipe } from '@angular/common';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';
import { NotesTableComponent } from './notes-table/notes-table.component';

@Component({
  selector: 'app-view-scotch',
  templateUrl: './view.template.html',
  styleUrls: ['./view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
     // WishlistsService,
     // PricesService
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
  prices: any[];

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;
  title = 'Details';
  subtitle = 'Details';

  newScotch: any;
  selectedScotch: any;
  editedScotch: any;

  dialogTitle: string;
  prompt: string;

  dataLoaded: Boolean;

/*** Constructor ******************************************/

  constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _scotchesService: ScotchesService,
        // private _wishlistsService: WishlistsService,
        // private _pricesService: PricesService,
        public _confirmDialogService: ConfirmDialogService,
        public _editDialogService: EditDialogService) {

    /** handle delete confirmation dialog repsonses **/
/*    _confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          // this.deleteRecord(response.type);
        }
      });
*/
    /** handle edit dialog repsonses **/
    _editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          console.log('wrong turn');
          this.saveScotch();
        }
      });
  }

/*** Initialization **************************************/

  ngOnInit() {
    this.user = this._authenticationService.user;
    this.fetchScotch('internal');
  }

/*** Populate or refresh the data ************************/

  fetchScotch(event) {
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
        this.prices = scotch.prices;
        this.allowEdit = (this.user && this.user._id === this.scotch.creator._id);
        this.dataLoaded = true;
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
      this.fetchScotch('internal');
    });
  }

/*** Misc **************/

  ngOnDestroy() {
    this.paramsObserver.unsubscribe();
  }
}
