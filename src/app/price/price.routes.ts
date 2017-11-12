import { Routes } from '@angular/router';
import { PricesComponent } from './price.component';

import { ListComponent } from './list/list.component';

export const PricesRoutes: Routes = [{
  path: 'prices',
  component: PricesComponent,
  children: [
    {path: '', component: ListComponent},
  ],
}];
