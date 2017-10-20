import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ScotchesService } from '../scotches.service';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-list-scotches',
  templateUrl: './list.template.html',
  styleUrls: ['./list.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService
   ]
})

export class ListComponent implements OnInit, OnChanges {
  scotches: any;
  errorMessage: string;
  title = 'Cabinet';
  subtitle = 'Current Inventory';
  displayDialog: boolean;
  confirmDialgo: boolean;
  selectedScotch: any;
  editedScotch: any;
  newScotch: boolean;
  dialogTitle: string;
  confirmDialogTitle: string;

  constructor(private _scotchesService: ScotchesService,
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
    this._scotchesService.list().subscribe(scotches  => this.scotches = scotches);
  }

  ngOnChanges() {
    // this._scotchesService.list().subscribe(scotches  => this.scotches = scotches);
  }

  addScotch() {
    this.newScotch = true;
    this.editedScotch = new Object();
    this._editDialogService.launchDialog({type: 'scotch',
                                            title: 'Add Scotch',
                                            editedObject: this.editedScotch,
                                            doLaunch: true});
  }

  editScotch(scotch: any) {
    this.newScotch = false;
    this.selectedScotch = scotch;
    this.editedScotch = this.cloneScotch(scotch);
    this._editDialogService.launchDialog({type: 'scotch',
                                            title: 'Edit ' + scotch.dramName,
                                            editedObject: this.editedScotch,
                                            doLaunch: true});
  }

  confirmDeleteScotch(bygoneScotch: any) {
    this.selectedScotch = bygoneScotch;
    this._confirmDialogService.launchDialog({type: 'scotch',
                                            title: 'Delete Scotch',
                                            prompt: 'Do you want to delete ' + bygoneScotch.dramName,
                                            doLaunch: true});
  }

  cloneScotch(s: any): any {
    const clonedScotch = new Object();
    for (const prop of Object.keys(s)) {
      clonedScotch[prop] = s[prop];
    }
    return clonedScotch;
  }

  save() {
    const newScotches = [...this.scotches];
    if (this.newScotch) {
      this.newScotch = false;
      this._scotchesService.create(this.editedScotch).subscribe(scotch => {
        newScotches.push(scotch);
        this.scotches = newScotches;
        this.selectedScotch = null;
        this.editedScotch = null;
      });
    } else {
      this._scotchesService.update(this.editedScotch).subscribe(scotch => {
        const index = this.findSelectedScotchIndex();
        newScotches[index] = scotch;
        this.scotches = newScotches;
        this.selectedScotch = null;
        this.editedScotch = null;
      });
    }
  }

  delete() {
    this._scotchesService.delete(this.selectedScotch._id).subscribe(scotch => {
      const index = this.findSelectedScotchIndex();
      this.scotches = this.scotches.filter((val, i) => i !== index);
      this.selectedScotch = null;
    });
  }

  findSelectedScotchIndex(): number {
    return this.scotches.indexOf(this.selectedScotch);
  }

  showDetails(scotch) {
    this._router.navigate(['/scotches', scotch._id]);
  }
}
