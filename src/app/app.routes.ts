import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { AuthenticationComponent } from './authentication/authentication.component';

export const AppRoutes: Routes = [
     { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent},
    { path: '**', redirectTo: '/'}
];
