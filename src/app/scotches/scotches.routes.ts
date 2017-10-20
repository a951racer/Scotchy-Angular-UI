import { Routes } from '@angular/router';
import { ScotchesComponent } from './scotches.component';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

export const ScotchesRoutes: Routes = [{
  path: 'scotches',
  component: ScotchesComponent,
  children: [
    {path: '', component: ListComponent},
    {path: ':scotchId', component: ViewComponent}
  ],
}];
