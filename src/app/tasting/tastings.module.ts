import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '../../assets/datatable/datatable.module';

import { TastingsRoutes } from './tastings.routes';
import { TastingsComponent } from './tastings.component';
import { PartialsModule } from '../../assets/partials/partials.module';

import { ListComponent } from './list/list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    DatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(TastingsRoutes),
  ],
  declarations: [
    TastingsComponent,
    ListComponent,
//    ViewComponent,
  ]
})
export class TastingsModule {}
