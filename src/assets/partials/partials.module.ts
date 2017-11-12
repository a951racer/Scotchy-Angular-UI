import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';
import { RatingComponent } from './rating/rating.component';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { EditDialog } from './edit-dialog/edit-dialog.component';
import { ScotchEditFormComponent } from '../../app/scotches/edit/scotch-edit-form.component';
import { NoteEditFormComponent } from '../../app/note/note-edit-form.component';
import { TastingEditFormComponent } from '../../app/tasting/tasting-edit-form.component';
import { TastingDetailFormComponent } from '../../app/tasting/tasting-detail-form.component';
import { WishlistEditFormComponent } from '../../app/wishlist/edit/wishlist-edit-form.component';
import { WishlistSelectFormComponent } from '../../app/wishlist/wishlist-select-form.component';
import { PriceEditFormComponent } from '../../app/price/price-edit-form.component';
import { ScotchSelectFormComponent } from '../../app/scotches/scotch-select-form-component';
// import { SigninComponent } from '../../app/authentication/signin/signin.component';
// import { SignupComponent } from '../../app/authentication/signup/signup.component';
import { StyleEditFormComponent } from '../../app/lookup/edit/style-edit.form.component';
import { RegionEditFormComponent } from '../../app/lookup/edit/region-edit.form.component';
import { UtcDatePipe } from '../../helpers/utcDate.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    PageHeaderComponent,
    NavbarComponent,
    LoginNavbarComponent,
    RatingComponent,
    ConfirmDialog,
    EditDialog,
    ScotchEditFormComponent,
    NoteEditFormComponent,
    TastingEditFormComponent,
    TastingDetailFormComponent,
    WishlistEditFormComponent,
    WishlistSelectFormComponent,
    PriceEditFormComponent,
    ScotchSelectFormComponent,
    StyleEditFormComponent,
    RegionEditFormComponent,
    UtcDatePipe
    // SigninComponent,
    // SignupComponent
  ],
  exports: [
    FooterComponent,
    PageHeaderComponent,
    NavbarComponent,
    LoginNavbarComponent,
    RatingComponent,
    ConfirmDialog,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialog,
    EditDialog,
    ScotchEditFormComponent,
    NoteEditFormComponent,
    TastingEditFormComponent,
    TastingDetailFormComponent,
    WishlistEditFormComponent,
    WishlistSelectFormComponent,
    PriceEditFormComponent,
    ScotchSelectFormComponent,
    StyleEditFormComponent,
    RegionEditFormComponent,
    UtcDatePipe,
    // SigninComponent,
    // SignupComponent,
    RouterModule
  ],
})

export class PartialsModule {}
