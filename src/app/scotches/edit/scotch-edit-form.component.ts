import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Router } from '@angular/router';
import { StylesService } from '../../lookup/styles.service';
import { RegionsService } from '../../lookup/regions.service';


@Component({
  selector: 'app-scotch-edit-form',
  templateUrl: './scotch-edit-form.template.html',
  providers: [
    StylesService,
    RegionsService
  ]
})

export class ScotchEditFormComponent implements OnInit {
  @Input() scotch: any;
  styles: any;
  regions: any;

  constructor(private _stylesService: StylesService,
              private _regionsService: RegionsService) {}

  ngOnInit() {
    this._stylesService.list().subscribe(styles => {
      this.styles = styles;
    });
    this._regionsService.list().subscribe(regions => {
      this.regions = regions;
    });
  }
}
