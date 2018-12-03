import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Router } from '@angular/router';
import { ScotchesService } from './scotches.service';

@Component({
  selector: 'app-scotch-select-form',
  templateUrl: './scotch-select-form-component.html',
  providers: [ScotchesService]
})

export class ScotchSelectFormComponent implements OnInit {
  @Input() scotch: any;
  scotches: any;

  constructor(private _scotchesService: ScotchesService) {}

  ngOnInit() {
    this._scotchesService.list().subscribe(scotches  => {
      this.scotches = scotches;
    });
  }
}
