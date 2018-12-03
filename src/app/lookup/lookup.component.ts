import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { StylesService } from './styles.service';
import { RegionsService } from './regions.service';
// import { DatePipe } from '@angular/common';
// import { ConfirmDialog } from '../../../assets/partials/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-view-lookups',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
     StylesService,
     RegionsService
   ]
})

export class LookupsComponent implements OnInit, OnDestroy {
  user: any;
  styles: any[];
  regions: any[];

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;
  title = 'Lookup Tables';
  subtitle = 'Just hangin....';

  newStyle: boolean;
  selectedStyle: any;
  editedStyle: any;

  selectedRegion: any;
  newRegion: boolean;
  editedRegion: any;

  dialogTitle: string;
  prompt: string;

/*** Constructor ******************************************/

  constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _stylesService: StylesService,
        private _regionsService: RegionsService,
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
    this.fetchLookups();
  }

/*** Populate or refresh the data ************************/

  fetchLookups() {
      this._stylesService.list().subscribe(styles => {
        this.styles = styles;
      },
      error => this._router.navigate(['lookups'])
    );
      this._regionsService.list().subscribe(regions => {
        this.regions = regions;
      },
      error => this._router.navigate(['lookups'])
    );
  }

/***  Styles  ****************/

  addStyle() {
    this.newStyle = true;
    this.editedStyle = new Object();
    this._editDialogService.launchDialog({type: 'style',
                                            title: 'Add Style',
                                            editedObject: this.editedStyle,
                                            doLaunch: true});
  }

  editStyle(style: any) {
    this.newStyle = false;
    this.selectedStyle = style;
    this.editedStyle = this.cloneStyle(style);
    this._editDialogService.launchDialog({type: 'style',
                                            title: 'Edit Style',
                                            editedObject: this.editedStyle,
                                            doLaunch: true});
  }

  confirmDeleteStyle(bygoneStyle: any) {
    this.selectedStyle = bygoneStyle;
    this._confirmDialogService.launchDialog({type: 'style',
                                            title: 'Delete Style',
                                            prompt: 'Do you want to delete "' + this.selectedStyle.name + '"?',
                                            doLaunch: true});
  }

  saveStyle() {
    if (this.newStyle) {
      this.newStyle = false;
      this._stylesService.create(this.editedStyle).subscribe(style => {
        this.selectedStyle = null;
        this.editedStyle = null;
        this.fetchLookups();
      });
    } else {
      this._stylesService.update(this.editedStyle).subscribe(style => {
        this.selectedStyle = null;
        this.editedStyle = null;
        this.fetchLookups();
      });
    }
  }

  cloneStyle(s: any): any {
    const clonedStyle = new Object();
    for (const prop of Object.keys(s)) {
      clonedStyle[prop] = s[prop];
    }
    return clonedStyle;
  }

/***  Regions  ******************/

  addRegion() {
    this.newRegion = true;
    this.editedRegion = new Object();
    this._editDialogService.launchDialog({type: 'region',
                                            title: 'Add Region',
                                            editedObject: this.editedRegion,
                                            doLaunch: true});
  }

  editRegion(region: any) {
    this.newRegion = false;
    this.selectedRegion = region;
    this.editedRegion = this.cloneRegion(region);
    this._editDialogService.launchDialog({type: 'region',
                                            title: 'Edit Region',
                                            editedObject: this.editedRegion,
                                            doLaunch: true});
  }

  confirmDeleteRegion(bygoneRegion: any) {
    this.selectedRegion = bygoneRegion;
    this._confirmDialogService.launchDialog({type: 'region',
                                            title: 'Delete Region',
                                            prompt: 'Do you want to delete "' + this.selectedRegion.name + '"?',
                                            doLaunch: true});
  }

  saveRegion() {
    if (this.newRegion) {
      this.newRegion = false;
      this._regionsService.create(this.editedRegion).subscribe(region => {
        this.selectedRegion = null;
        this.editedRegion = null;
        this.fetchLookups();
      });
    } else {
      this._regionsService.update(this.editedRegion).subscribe(regions => {
        this.selectedRegion = null;
        this.editedRegion = null;
        this.fetchLookups();
      });
    }
  }

  cloneRegion(r: any): any {
    const clonedRegion = new Object();
    for (const prop of Object.keys(r)) {
      clonedRegion[prop] = r[prop];
    }
    return clonedRegion;
  }

/*** All record types  **************/

  saveRecord(response: any) {
    switch (response.type) {
      case 'style':
        this.saveStyle();
        break;
      case 'region':
        this.saveRegion();
        break;
    }
  }

  deleteRecord(type: string) {
    switch (type) {
      case 'style':
        this._stylesService.delete(this.selectedStyle._id).subscribe(style => {
          this.selectedStyle = null;
          this.fetchLookups();
        });
        break;
      case 'region':
        this._regionsService.delete(this.selectedRegion._id).subscribe(region => {
          this.selectedRegion = null;
          this.fetchLookups();
        });
        break;
    }
  }

/*** Misc **************/

  ngOnDestroy() {
    // this.paramsObserver.unsubscribe();
  }
}
