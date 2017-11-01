import { Component } from '@angular/core';
import { TastingsService } from './tastings.service';

@Component({
  selector: 'app-tastings',
  template: '<router-outlet></router-outlet>',
  providers: [TastingsService]
})

export class TastingsComponent {}
