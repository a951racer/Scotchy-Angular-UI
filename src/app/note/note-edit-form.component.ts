import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.template.html',
})

export class NoteEditFormComponent {
  @Input() note: any;
}
