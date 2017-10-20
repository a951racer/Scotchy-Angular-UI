import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  template: '<router-outlet></router-outlet>',
  providers: [SettingsService]
})

export class SettingsComponent {}
