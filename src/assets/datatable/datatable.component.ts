import {Http, Response} from '@angular/http';
import {Injectable, Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import {ColumnComponent} from './column.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.template.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnChanges {

  @Input() dataset;
  @Input() dataSetName;
  @Input() pageSize;
  @Input() newButton;
  @Input() detailsButton;
  @Input() editButton;
  @Input() deleteButton;
  @Input() filterButton;

  @Output() newItem: EventEmitter<string> = new EventEmitter();
  @Output() editItem: EventEmitter<string> = new EventEmitter();
  @Output() deleteItem: EventEmitter<string> = new EventEmitter();
  @Output() showDetails: EventEmitter<string> = new EventEmitter();

  columns: ColumnComponent[] = [];
  showFilters = false;
  filteredData: any;
  displayedData: any;
  currentIndex: number;
  startPage: number;
  pagesIndex: number;
  pages: number;
  numberOfPages: number;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes.dataset.currentValue) {
      this.filteredData = this.dataset;
      this.init();
    }
  }

  addColumn(column) {
    this.columns.push(column);
  }

/*** Pagination Stuff ****************************************/

  init() {
    this.currentIndex = 1;
    this.startPage = 1;

    this.numberOfPages = Math.floor(this.filteredData.length / this.pageSize);
    if (this.filteredData.length % this.pageSize !== 0) {
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
    this.displayedData = this.filteredData.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
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

/*** Filtering Stuff ***************************************************/

  toggleFilterRow() {
    let input;
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      for (let x = 0; x < this.columns.length; x++) {
        if (this.columns[x].filterable === 'true') {
          input = document.getElementById(this.columns[x].fieldName + 'Filter');
          input.value = '';
        }
      }
      this.filterTable();
    }
  }

  filterTable() {
    let input, filter, show;
    this.filteredData = [];
    this.dataset.forEach(item => {
      show = true;
      for (let x = 0; x < this.columns.length; x++) {
        if (this.columns[x].filterable === 'true') {
          input = document.getElementById(this.columns[x].fieldName + 'Filter');
          switch (this.columns[x].dataType) {
            case 'boolean':
              filter = input.checked;
              if (filter) {
                const searchDomain = (item[this.columns[x].fieldName] || false);
                console.log(filter + ' : ' + searchDomain);
                if (searchDomain !== filter) {
                      show = false;
                }
              }
              break;
            case 'text':
              filter = input.value.toUpperCase();
              if (filter !== '') {
                const searchDomain = (item[this.columns[x].fieldName] || '');
                if (searchDomain.toUpperCase().indexOf(filter) === -1) {
                      show = false;
                }
              }
          }
        }
      }
      if (show) {
        this.filteredData.push(item);
      }
    });
    this.init();
  }

/*** Sorting **************************************************************/

  sortTable (sortable: string, fieldName: string, dataType: string) {
    if (sortable === 'true') {
      let switching, i, x, y, temp, shouldSwitch, dir, switchcount = 0;
      switching = true;
      dir = 'asc';
      while (switching) {
        switching = false;
        for (i = 0; i < this.filteredData.length - 1; i++) {
          shouldSwitch = false;
          switch (dataType) {
            case 'text':
            case 'date':
              x = (this.filteredData[i][fieldName] || '').toLowerCase();
              y = (this.filteredData[i + 1][fieldName] || '').toLowerCase();
              break;
            case 'currency':
            case 'numeric':
              x = Number(this.filteredData[i][fieldName] || 0);
              y = Number(this.filteredData[i + 1][fieldName] || 0);
              break;
            case 'boolean':
              x = Number(this.filteredData[i][fieldName] || 0);
              y = Number(this.filteredData[i + 1][fieldName] || 0);
              break;
          }
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
          temp = this.filteredData[i];
          this.filteredData[i] = this.filteredData[i + 1];
          this.filteredData[i + 1] = temp;
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
  }

/*** Data management ***************************************/

  new() {
    this.newItem.emit('');
  }

  edit(item: any) {
    this.editItem.emit(item);
  }

  delete(item: any) {
    this.deleteItem.emit(item);
  }

  details(item: any) {
    this.showDetails.emit(item);
  }
}
