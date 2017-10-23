import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasting-edit-form',
  templateUrl: './tasting-edit-form.template.html',
  styleUrls: ['./tasting-edit-form.component.css']
})

export class TastingEditFormComponent {
  @Input() tasting: any;
}
