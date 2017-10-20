import { Component } from '@angular/core';
import { ScotchesService } from './scotches.service';

@Component({
  selector: 'app-scotches',
  template: '<router-outlet></router-outlet>',
  providers: [ScotchesService]
})

export class ScotchesComponent {}
