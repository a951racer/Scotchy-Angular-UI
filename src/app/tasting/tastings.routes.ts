import { Routes } from '@angular/router';
import { TastingsComponent } from './tastings.component';

import { ListComponent } from './list/list.component';

export const TastingsRoutes: Routes = [{
  path: 'tastings',
  component: TastingsComponent,
  children: [
    {path: '', component: ListComponent},
  ],
}];
