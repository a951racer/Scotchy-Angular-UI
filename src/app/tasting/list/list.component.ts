import { Component, OnInit, OnChanges } from '@angular/core';
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
      this.sortTable('dateAdded');
      this.init();
    });
  }

  /*****************************************************************************************************/

  init() {
    this.currentIndex = 1;
    this.startPage = 1;
    this.pages = 4;

    this.numberOfPages = Math.floor(this.filteredTastings.length / this.pageSize);
    if (this.filteredTastings.length % this.pageSize !== 0) {
      this.numberOfPages++;
    }
    this.refreshItems();
  }

  fillArray(): any {
    const obj = new Array();
    for (let index = this.startPage; index < this.startPage + this.numberOfPages; index ++) {
      obj.push(index);
    }
    return obj;
  }

  refreshItems() {
    this.displayedTastings = this.filteredTastings.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex =  this.fillArray();
  }

   prevPage() {
      if (this.currentIndex > 1) {
         this.currentIndex--;
      }
      if (this.currentIndex < this.startPage) {
         this.currentIndex = this.startPage;
      }
      this.refreshItems();
   }

  nextPage() {
    if (this.currentIndex < this.numberOfPages) {
      this.currentIndex ++;
    }
    if (this.currentIndex >= (this.startPage + this.numberOfPages)) {
      this.currentIndex = this.startPage - this.pages + 1;
    }
    this.refreshItems();
  }

  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

  /*****************************************************************************************************/

  filterTable() {
   let input, filter, typeInput, typeFilter;
    this.filteredTastings = [];
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    typeInput = document.getElementById('types');
    typeFilter = typeInput.value;
    this.tastings.forEach(tasting => {
      const searchDomain = tasting.nose + tasting.palate + tasting.finish + tasting.comment;
      if (searchDomain.toUpperCase().indexOf(filter) > -1) {
        switch (typeFilter) {
          case 'Both':
            this.filteredTastings.push(tasting);
            break;
          case 'Personal':
            if (!tasting.thirdParty) {
              this.filteredTastings.push(tasting);
            }
            break;
          case 'ThirdParty':
            if (tasting.thirdParty) {
              this.filteredTastings.push(tasting);
            }
            break;
        }
      }
    });
    this.init();
  }

  sortTable (column: string) {
    let switching, i, x, y, temp, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      for (i = 0; i < this.filteredTastings.length - 1; i++) {
        shouldSwitch = false;
        x = this.filteredTastings[i][column];
        y = this.filteredTastings[i + 1][column];
        if (dir === 'asc') {
          if (x.toLowerCase() > y.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x.toLowerCase() < y.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        temp = this.filteredTastings[i];
        this.filteredTastings[i] = this.filteredTastings[i + 1];
        this.filteredTastings[i + 1] = temp;
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
    this.init();
  }

  sortTableBoolean (column: string) {
    let switching, i, x, y, temp, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      for (i = 0; i < this.filteredTastings.length - 1; i++) {
        shouldSwitch = false;
        x = (this.filteredTastings[i][column] || false);
        y = (this.filteredTastings[i + 1][column] || false);
        if (dir === 'asc') {
          if (x > y) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x < y) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        temp = this.filteredTastings[i];
        this.filteredTastings[i] = this.filteredTastings[i + 1];
        this.filteredTastings[i + 1] = temp;
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
    this.init();
  }

  sortTableNumeric (column: string) {
    let switching, i, x, y, temp, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      for (i = 0; i < this.filteredTastings.length - 1; i++) {
        shouldSwitch = false;
        x = (this.filteredTastings[i][column] || 0);
        y = (this.filteredTastings[i + 1][column] || 0);
        if (dir === 'asc') {
          if (x > y) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x < y) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        temp = this.filteredTastings[i];
        this.filteredTastings[i] = this.filteredTastings[i + 1];
        this.filteredTastings[i + 1] = temp;
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
    this.init();
  }

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
      }); */
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
}
