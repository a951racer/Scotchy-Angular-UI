import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-price-edit-form',
  templateUrl: './price-edit-form.template.html'
})

export class PriceEditFormComponent {
  @Input() price: any;
}
