import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmDialogService } from '../../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../../assets/partials/edit-dialog/edit-dialog.service';
import { ScotchesService } from '../../scotches.service';

@Component({
  selector: 'app-third-tastings-table',
  templateUrl: './third-tastings-table.template.html',
  styleUrls: ['../view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
   ]
})

export class ThirdTastingsTableComponent implements OnInit {
  @Input() thirdPartyTastings: any[];
  @Input() scotch: any;
  @Output() refreshNeeded: EventEmitter<string> = new EventEmitter();

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;

  newTasting: boolean;
  selectedTasting: any;
  editedTasting: any;

  dialogTitle: string;
  prompt: string;


  constructor(private _scotchesService: ScotchesService,
              private _editDialogService: EditDialogService,
              private _confirmDialogService: ConfirmDialogService) {}


  ngOnInit() {
    /** handle delete confirmation dialog repsonses **/
    this._confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this._scotchesService.deleteTasting(this.scotch._id, this.selectedTasting).subscribe(scotch => {
          this.selectedTasting = null;
          this.refreshNeeded.emit('thirdPartyTastings');
          });
        }
      });

    /** handle edit dialog repsonses **/
    this._editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          if (this.newTasting) {
            this.newTasting = false;
            this._scotchesService.addTasting(this.scotch._id, this.editedTasting).subscribe(scotch => {
              this.selectedTasting = null;
              this.editedTasting = null;
              this.refreshNeeded.emit('thirdPartyTastings');
            });
          } else {
            this._scotchesService.updateTasting(this.scotch._id, this.editedTasting).subscribe(scotch => {
              this.selectedTasting = null;
              this.editedTasting = null;
              this.refreshNeeded.emit('thirdPartyTastings');
            });
          }
        }
      });
  }

/***  Tastings  ****************/

  addTasting() {
    this.newTasting = true;
    this.editedTasting = new Object();
    this.editedTasting.thirdParty = true;
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
                                            prompt: 'Do you want to delete this tasting entry?',
                                            doLaunch: true});
  }

  cloneTasting(n: any): any {
    const clonedTasting = new Object();
    for (const prop of Object.keys(n)) {
      clonedTasting[prop] = n[prop];
    }
    return clonedTasting;
  }

  showTastingDetails(tasting: any) {
    this.selectedTasting = tasting;
    this._editDialogService.launchDialog({type: 'tastingDetail',
                                            title: 'Tasting Notes',
                                            editedObject: this.selectedTasting,
                                            doLaunch: true});
  }
}
