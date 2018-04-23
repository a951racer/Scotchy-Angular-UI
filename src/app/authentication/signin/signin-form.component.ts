import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.template.html',
})

export class SigninFormComponent {
  @Input() user: any;
}
