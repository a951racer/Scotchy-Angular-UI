import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatableComponent } from './datatable.component';
import { ColumnComponent } from './column.component';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    PartialsModule
  ],
  declarations: [
    DatatableComponent,
    ColumnComponent,
  ],
  exports: [
    DatatableComponent,
    ColumnComponent,
  ],
})

export class DatatableModule {}
