import { Routes } from '@angular/router';
import { WishlistsComponent } from './wishlists.component';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

export const WishlistsRoutes: Routes = [{
  path: 'wishlists',
  component: WishlistsComponent,
  children: [
    {path: '', component: ListComponent},
    {path: ':wishlistId', component: ViewComponent}
  ],
}];
