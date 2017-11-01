import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TastingsRoutes } from './tastings.routes';
import { TastingsComponent } from './tastings.component';
import { PartialsModule } from '../../assets/partials/partials.module';

// import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
// import { ViewComponent } from './view/view.component';
// import { EditComponent } from './edit/edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
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
