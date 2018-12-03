import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmDialogService } from '../../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../../assets/partials/edit-dialog/edit-dialog.service';
import { ScotchesService } from '../../scotches.service';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.template.html',
  styleUrls: ['../view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService,
   ]
})

export class PricesTableComponent implements OnInit {
  @Input() prices: any[];
  @Input() scotch: any;
  @Output() refreshNeeded: EventEmitter<string> = new EventEmitter();

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;

  newPrice: boolean;
  selectedPrice: any;
  editedPrice: any;

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
          this._scotchesService.deletePrice(this.scotch._id, this.selectedPrice).subscribe(scotch => {
          this.selectedPrice = null;
          this.refreshNeeded.emit('prices');
          });
        }
      });

    /** handle edit dialog repsonses **/
    this._editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          if (this.newPrice) {
            this.newPrice = false;
            this._scotchesService.addPrice(this.scotch._id, this.editedPrice).subscribe(scotch => {
              this.selectedPrice = null;
              this.editedPrice = null;
              this.refreshNeeded.emit('prices');
            });
          } else {
            this._scotchesService.updatePrice(this.scotch._id, this.editedPrice).subscribe(scotch => {
              this.selectedPrice = null;
              this.editedPrice = null;
              this.refreshNeeded.emit('prices');
            });
          }
        }
      });
  }

/***  Prices  ****************/

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
                                            title: 'Edit Price',
                                            editedObject: this.editedPrice,
                                            doLaunch: true});
  }

  confirmDeletePrice(bygonePrice: any) {
    this.selectedPrice = bygonePrice;
    this._confirmDialogService.launchDialog({type: 'price',
                                            title: 'Delete Price',
                                            prompt: 'Do you want to delete this price entry?',
                                            doLaunch: true});
  }

  clonePrice(n: any): any {
    const clonedPrice = new Object();
    for (const prop of Object.keys(n)) {
      clonedPrice[prop] = n[prop];
    }
    return clonedPrice;
  }
}
