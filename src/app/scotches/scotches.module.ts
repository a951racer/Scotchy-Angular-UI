import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ScotchesRoutes } from './scotches.routes';
import { ScotchesComponent } from './scotches.component';
import { PartialsModule } from '../../assets/partials/partials.module';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

import { NotesTableComponent } from './view/notes-table/notes-table.component';
import { WishlistsTableComponent } from './view/wishlists-table/wishlists-table.component';
import { PricesTableComponent } from './view/prices-table/prices-table.component';
import { TastingsTableComponent } from './view/tastings-table/tastings-table.component';
import { ThirdTastingsTableComponent } from './view/third-tastings-table/third-tastings-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ScotchesRoutes),
  ],
  declarations: [
    ScotchesComponent,
    ListComponent,
    ViewComponent,
    NotesTableComponent,
    PricesTableComponent,
    TastingsTableComponent,
    ThirdTastingsTableComponent,
    WishlistsTableComponent
  ],
  exports: [
    NotesTableComponent,
    PricesTableComponent,
    TastingsTableComponent,
    ThirdTastingsTableComponent,
    WishlistsTableComponent
  ]
})
export class ScotchesModule {}
