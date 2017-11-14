import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// import { DatatableComponent } from '../../assets/datatable/datatable.component';
// import { ColumnComponent } from '../../assets/datatable/column.component';

import { PricesRoutes } from './price.routes';
import { PricesComponent } from './price.component';
import { DatatableModule } from '../../assets/datatable/datatable.module';
import { PartialsModule } from '../../assets/partials/partials.module';

import { ListComponent } from './list/list.component';
// import { ViewComponent } from './view/view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    DatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(PricesRoutes),
  ],
  declarations: [
    PricesComponent,
    ListComponent,
    // DatatableComponent,
    // ColumnComponent,
//    ViewComponent,
  ]
})
export class PricesModule {}
