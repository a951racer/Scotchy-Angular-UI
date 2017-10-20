import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationRoutes } from './authentication.routes';
import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';

import { PartialsModule } from '../../assets/partials/partials.module';

@NgModule({
  imports: [
      PartialsModule,
      RouterModule.forChild(AuthenticationRoutes),
    ],
  declarations: [
      AuthenticationComponent,
      SigninComponent,
      SignupComponent,
      SignoutComponent
    ]
})

export class AuthenticationModule {}
