import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

// import { ListComponent } from './list/list.component';
// import { ViewComponent } from './view/view.component';

export const SettingsRoutes: Routes = [{
  path: 'settings',
  component: SettingsComponent,
  children: [
//    {path: '', component: ListComponent},
//    {path: ':scotchId', component: ViewComponent}
  ],
}];
