import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatatableModule } from '../../assets/datatable/datatable.module';

import { LookupsRoutes } from './lookup.routes';
import { LookupsComponent } from './lookup.component';
import { PartialsModule } from '../../assets/partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    DatatableModule,
    RouterModule.forChild(LookupsRoutes),
  ],
  declarations: [
    LookupsComponent,
  ]
})
export class LookupsModule {}
