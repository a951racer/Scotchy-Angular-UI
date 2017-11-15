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
  title = 'Price List';
  subtitle = 'Current Prices';
  displayDialog: boolean;
  confirmDialog: boolean;
  selectedPrice: any;
  editedPrice: any;
  newPrice: boolean;
  dialogTitle: string;
  confirmDialogTitle: string;

  dataSetName = 'prices';
  pageSize = 15;

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
    });
  }

  /*****************************************************************************************************/

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

  navigate(link: any) {
    this._router.navigate([link.link, link.id]);
  }
}
