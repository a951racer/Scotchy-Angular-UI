import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-tasting-detail-form',
  templateUrl: './tasting-detail-form.template.html'
})

export class TastingDetailFormComponent {
  @Input() tasting: any;
}
