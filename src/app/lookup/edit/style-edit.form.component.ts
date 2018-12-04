import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Router } from '@angular/router';
import { StylesService } from '../../lookup/styles.service';

@Component({
  selector: 'app-style-edit-form',
  templateUrl: './style-edit.form.template.html',
  providers: [
    StylesService,
  ]
})

export class StyleEditFormComponent implements OnInit {
  @Input() style: any;

  constructor(private _stylesService: StylesService) {}

  ngOnInit() {

  }
}
