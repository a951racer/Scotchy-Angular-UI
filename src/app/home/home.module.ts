import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './home.routes';
import { PartialsModule } from '../../assets/partials/partials.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    PartialsModule,
    RouterModule.forChild(HomeRoutes),
  ],
  declarations: [
    HomeComponent,
  ],
})

export class HomeModule {}
