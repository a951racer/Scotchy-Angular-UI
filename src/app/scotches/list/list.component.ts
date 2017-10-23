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
  showFilters = false;

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

/*** Table Sorting *****************/

  sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, startRow;
    table = document.getElementById('scotchTable');
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName('TR');
      if (this.showFilters) {
        startRow = 2;
      } else {
        startRow = 1;
      }
      for (i = startRow; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        if (dir === 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  sortTableNumeric(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, startRow;
    table = document.getElementById('scotchTable');
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName('TR');
      if (this.showFilters) {
        startRow = 2;
      } else {
        startRow = 1;
      }
      for (i = startRow; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        if (dir === 'asc') {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

/*** Table Filtering *********************************/
  toggleFilterRow() {
    this.showFilters = !this.showFilters;
  }

  filterTable(c, id) {
    let input, filter, table, tr, td, i;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    table = document.getElementById('scotchTable');
    tr = table.getElementsByTagName('tr');
    for (i = 2; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[c];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  filterByRating(c, id) {
    console.log('filter by rating');
    let input, filter, table, tr, td, i, children, rating;
    input = document.getElementById(id);
    filter = Number(input.value);
    console.log(filter);
    table = document.getElementById('scotchTable');
    tr = table.getElementsByTagName('tr');
    for (i = 2; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[c];
      if (td) {
        rating = Number(tr[i].getElementsByTagName('td')[9].innerHTML);
        if (rating >= filter) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }


  filterInStock(c, id) {
    let input, filter, table, tr, td, i, inStock;
    input = document.getElementById(id);
    filter = input.checked;
    table = document.getElementById('scotchTable');
    tr = table.getElementsByTagName('tr');
    for (i = 2; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[c];
      inStock = Boolean(Number(tr[i].getElementsByTagName('td')[10].innerHTML));
      if (td) {
        if (filter) {
          if (inStock) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        } else {
          tr[i].style.display = '';
        }
      }
    }
  }

} // end class definition
