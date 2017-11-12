import { Component } from '@angular/core';
import { PricesService } from './price.service';

@Component({
  selector: 'app-prices',
  template: '<router-outlet></router-outlet>',
  providers: [PricesService]
})

export class PricesComponent {}
