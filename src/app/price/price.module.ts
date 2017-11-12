import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PricesRoutes } from './price.routes';
import { PricesComponent } from './price.component';
import { PartialsModule } from '../../assets/partials/partials.module';

import { ListComponent } from './list/list.component';
// import { ViewComponent } from './view/view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PricesRoutes),
  ],
  declarations: [
    PricesComponent,
    ListComponent,
//    ViewComponent,
  ]
})
export class PricesModule {}
