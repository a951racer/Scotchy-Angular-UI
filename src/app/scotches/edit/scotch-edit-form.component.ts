import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scotch-edit-form',
  templateUrl: './scotch-edit-form.template.html',
})

export class ScotchEditFormComponent {
  @Input() scotch: any;
}
