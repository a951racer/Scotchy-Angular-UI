import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PartialsModule } from '../assets/partials/partials.module';
import { customHttpProvider } from '../helpers/custom-http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';

import { HomeModule } from './home/home.module';
import { ScotchesModule } from './scotches/scotches.module';
import { WishlistsModule } from './wishlist/wishlists.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PartialsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AuthenticationModule,
    HomeModule,
    ScotchesModule,
    WishlistsModule,
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
