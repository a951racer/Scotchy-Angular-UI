import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PricesService } from '../price.service';
import { ConfirmDialogService } from '../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../assets/partials/edit-dialog/edit-dialog.service';

@Component({
  selector: 'app-list-prices',
  templateUrl: './list.template.html',
  styleUrls: ['./list.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService
   ]
})

export class ListComponent implements OnInit {
  prices: any;
  filteredPrices: any;
  displayedPrices;
  errorMessage: string;
  title = 'Prices';
  subtitle = 'Current Prices';
  displayDialog: boolean;
  confirmDialog: boolean;
  selectedPrice: any;
  editedPrice: any;
  newPrice: boolean;
  dialogTitle: string;
  confirmDialogTitle: string;
  numberOfPages: number;
  currentIndex: number;
  startPage: number;
  pages: number;
  pageSize = 15;
  pagesIndex: number;
  showFilters = false;
  filters = [];
  numberOfFilters = 4;
  
  constructor(private _pricesService: PricesService,
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
    this._pricesService.list().subscribe(prices  => {
      this.prices = prices;
      this.filteredPrices = prices;
      for (let x = 0; x < this.numberOfFilters; x++) {
        this.filters[x] = new Object();
      }
      this.filters[0]['inputId'] = 'locationFilter';
      this.filters[0]['fieldName'] = 'location';
      this.filters[1]['inputId'] = 'sizeFilter';
      this.filters[1]['fieldName'] = 'size';
      this.filters[2]['inputId'] = 'commentFilter';
      this.filters[2]['fieldName'] = 'comment';
      this.filters[3]['inputId'] = 'dramFilter';
      this.filters[3]['fieldName'] = 'dramName';
      this.init();
    });
  }

  /*****************************************************************************************************/

  init() {
    this.currentIndex = 1;
    this.startPage = 1;
    this.pages = 4;

    this.numberOfPages = Math.floor(this.filteredPrices.length / this.pageSize);
    if (this.filteredPrices.length % this.pageSize !== 0) {
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
    this.displayedPrices = this.filteredPrices.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
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

/*** Table Filtering *************************/

  toggleFilterRow() {
    let input;
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      for (let x = 0; x < this.numberOfFilters; x++) {
        input = document.getElementById(this.filters[x].inputId);
        input.value = '';
      }
      this.filterTable();
    }
  }

  filterTable() {
    let input, filter, show;
    this.filteredPrices = [];
    this.prices.forEach(price => {
      show = true;
      for (let x = 0; x < this.numberOfFilters; x++) {
        input = document.getElementById(this.filters[x].inputId);
        filter = input.value.toUpperCase();
        if (filter !== '') {
          const searchDomain = (price[this.filters[x].fieldName] || '');
          if (searchDomain.toUpperCase().indexOf(filter) == -1) {
                show = false;
          };
        };
      };
      if (show) {
        this.filteredPrices.push(price);
      };
    });
    this.init();
  }

  sortTable (column: string) {
    let switching, i, x, y, temp, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      for (i = 0; i < this.filteredPrices.length - 1; i++) {
        shouldSwitch = false;
        x = (this.filteredPrices[i][column] || '');
        y = (this.filteredPrices[i + 1][column] || '');
        console.log(x);
        console.log(y);
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
        temp = this.filteredPrices[i];
        this.filteredPrices[i] = this.filteredPrices[i + 1];
        this.filteredPrices[i + 1] = temp;
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
      for (i = 0; i < this.filteredPrices.length - 1; i++) {
        shouldSwitch = false;
        x = (this.filteredPrices[i][column] || false);
        y = (this.filteredPrices[i + 1][column] || false);
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
        temp = this.filteredPrices[i];
        this.filteredPrices[i] = this.filteredPrices[i + 1];
        this.filteredPrices[i + 1] = temp;
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
      for (i = 0; i < this.filteredPrices.length - 1; i++) {
        shouldSwitch = false;
        x = (this.filteredPrices[i][column] || 0);
        y = (this.filteredPrices[i + 1][column] || 0);
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
        temp = this.filteredPrices[i];
        this.filteredPrices[i] = this.filteredPrices[i + 1];
        this.filteredPrices[i + 1] = temp;
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

  addPrice() {
    this.newPrice = true;
    this.editedPrice = new Object();
    this._editDialogService.launchDialog({type: 'price',
                                            title: 'Add Price',
                                            editedObject: this.editedPrice,
                                            doLaunch: true});
  }

  editPrice(price: any) {
    this.newPrice = false;
    this.selectedPrice = price;
    this.editedPrice = this.clonePrice(price);
    this._editDialogService.launchDialog({type: 'price',
                                            title: 'Edit Price for ' + price.dramName,
                                            editedObject: this.editedPrice,
                                            doLaunch: true});
  }

  confirmDeletePrice(bygonePrice: any) {
    this.selectedPrice = bygonePrice;
    this._confirmDialogService.launchDialog({type: 'price',
                                            title: 'Delete Price',
                                            prompt: 'Do you want to delete price for "' + bygonePrice.dramName + '"?',
                                            doLaunch: true});
  }

  clonePrice(t: any): any {
    const clonedPrice = new Object();
    for (const prop of Object.keys(t)) {
      clonedPrice[prop] = t[prop];
    }
    return clonedPrice;
  }

  save() {
    const newPrices = [...this.prices];
    if (this.newPrice) {
      this.newPrice = false;
      /* this._pricesService.create(this.editedPrice).subscribe(price => {
        newPrices.push(price);
        this.prices = newPrices;
        this.selectedPrice = null;
        this.editedPrice = null;
      }); */
    } else {
      /* this._pricesService.update(this.editedPrice).subscribe(price => {
        const index = this.findSelectedPriceIndex();
        newPrices[index] = price;
        this.prices = newPrices;
        this.selectedPrice = null;
        this.editedPrice = null;
      }); */
    }
  }

  delete() {
    /* this._pricesService.delete(this.selectedPrice._id).subscribe(price => {
      const index = this.findSelectedPriceIndex();
      this.prices = this.prices.filter((val, i) => i !== index);
      this.selectedPrice = null;
    }); */
  }

  findSelectedPriceIndex(): number {
    return this.prices.indexOf(this.selectedPrice);
  }

  showDetails(price) {
    this.selectedPrice = price;
    this._editDialogService.launchDialog({type: 'priceDetail',
                                            title: 'Price Notes for ' + this.selectedPrice.dramName,
                                            editedObject: this.selectedPrice,
                                            doLaunch: true});

  }
}
