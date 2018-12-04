import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TastingsService } from '../tastings.service';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-list-tastings',
  templateUrl: './list.template.html',
  styleUrls: ['./list.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService
   ]
})

export class ListComponent implements OnInit {
  tastings: any;
  filteredTastings: any;
  displayedTastings;
  errorMessage: string;
  title = 'Tasting Notes';
  subtitle = 'Current Tasting Notes';
  displayDialog: boolean;
  confirmDialgo: boolean;
  selectedTasting: any;
  editedTasting: any;
  newTasting: boolean;
  dialogTitle: string;
  confirmDialogTitle: string;
  numberOfPages: number;
  currentIndex: number;
  startPage: number;
  pages: number;
  pageSize = 10;
  pagesIndex: number;

  constructor(private _tastingsService: TastingsService,
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
    this._tastingsService.list().subscribe(tastings  => {
      this.tastings = tastings;
      this.filteredTastings =  tastings;
      // this.sortTable('dateAdded');
      // this.init();
    });
  }

  /*****************************************************************************************************/


  addTasting() {
    this.newTasting = true;
    this.editedTasting = new Object();
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
                                            title: 'Edit Tasting for ' + tasting.dramName,
                                            editedObject: this.editedTasting,
                                            doLaunch: true});
  }

  confirmDeleteTasting(bygoneTasting: any) {
    this.selectedTasting = bygoneTasting;
    this._confirmDialogService.launchDialog({type: 'tasting',
                                            title: 'Delete Tasting',
                                            prompt: 'Do you want to delete tasting for "' + bygoneTasting.dramName + '"?',
                                            doLaunch: true});
  }

  cloneTasting(t: any): any {
    const clonedTasting = new Object();
    for (const prop of Object.keys(t)) {
      clonedTasting[prop] = t[prop];
    }
    return clonedTasting;
  }

  save() {
    const newTastings = [...this.tastings];
    if (this.newTasting) {
      this.newTasting = false;
      /* this._tastingsService.create(this.editedTasting).subscribe(tasting => {
        newTastings.push(tasting);
        this.tastings = newTastings;
        this.selectedTasting = null;
        this.editedTasting = null;
      }); */
    } else {
      /* this._tastingsService.update(this.editedTasting).subscribe(tasting => {
        const index = this.findSelectedTastingIndex();
        newTastings[index] = tasting;
        this.tastings = newTastings;
        this.selectedTasting = null;
        this.editedTasting = null;
      });*/
    }
  }

  delete() {
    /* this._tastingsService.delete(this.selectedTasting._id).subscribe(tasting => {
      const index = this.findSelectedTastingIndex();
      this.tastings = this.tastings.filter((val, i) => i !== index);
      this.selectedTasting = null;
    }); */
  }

  findSelectedTastingIndex(): number {
    return this.tastings.indexOf(this.selectedTasting);
  }

  showDetails(tasting) {
    this.selectedTasting = tasting;
    this._editDialogService.launchDialog({type: 'tastingDetail',
                                            title: 'Tasting Notes for ' + this.selectedTasting.dramName,
                                            editedObject: this.selectedTasting,
                                            doLaunch: true});

  }

  navigate(link: any) {
    this._router.navigate([link.link, link.id]);
  }
}
