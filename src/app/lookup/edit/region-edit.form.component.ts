import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegionsService } from '../../lookup/regions.service';

@Component({
  selector: 'app-region-edit-form',
  templateUrl: './region-edit.form.template.html',
  providers: [
    RegionsService,
  ]
})

export class RegionEditFormComponent implements OnInit {
  @Input() region: any;

  constructor(private _regionsService: RegionsService) {}

  ngOnInit() {

  }
}
