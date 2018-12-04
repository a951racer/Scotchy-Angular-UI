import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PartialsModule } from '../assets/partials/partials.module';
import { customHttpProvider } from '../helpers/custom-http';
import { DatatableModule } from '../assets/datatable/datatable.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';

import { HomeModule } from './home/home.module';
import { ScotchesModule } from './scotches/scotches.module';
import { WishlistsModule } from './wishlist/wishlists.module';
import { TastingsModule } from './tasting/tastings.module';
import { PricesModule } from './price/price.module';
import { LookupsModule } from './lookup/lookup.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PartialsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthenticationModule,
    HomeModule,
    ScotchesModule,
    WishlistsModule,
    TastingsModule,
    PricesModule,
    LookupsModule,
    DatatableModule,
    RouterModule.forRoot(AppRoutes),

  ],
  providers: [
    AuthenticationService,
    customHttpProvider
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
