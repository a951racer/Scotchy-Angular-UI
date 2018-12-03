import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmDialogService } from '../../../../assets/partials/confirm-dialog/confirm-dialog.service';
import { EditDialogService } from '../../../../assets/partials/edit-dialog/edit-dialog.service';
import { ScotchesService } from '../../scotches.service';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.template.html',
  styleUrls: ['../view.component.css'],
   providers: [
     ConfirmDialogService,
     EditDialogService
   ]
})

export class NotesTableComponent implements OnInit {
  @Input() notes: any[];
  @Input() scotch: any;
  @Output() refreshNeeded: EventEmitter<string> = new EventEmitter();

  paramsObserver: any;
  errorMessage: string;
  allowEdit = false;

  newNote: boolean;
  selectedNote: any;
  editedNote: any;

  dialogTitle: string;
  prompt: string;


  constructor(private _scotchesService: ScotchesService,
              private _editDialogService: EditDialogService,
              private _confirmDialogService: ConfirmDialogService) {}


  ngOnInit() {
    /** handle delete confirmation dialog repsonses **/
    this._confirmDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          this._scotchesService.deleteNote(this.scotch._id, this.selectedNote).subscribe(scotch => {
          this.selectedNote = null;
          this.refreshNeeded.emit('notes');
        });

        }
      });

    /** handle edit dialog repsonses **/
    this._editDialogService.dialogResponded.subscribe(
      response => {
        if (response.confirmed) {
          if (this.newNote) {
            this.newNote = false;
            this._scotchesService.addNote(this.scotch._id, this.editedNote).subscribe(scotch => {
              this.selectedNote = null;
              this.editedNote = null;
              this.refreshNeeded.emit('notes');
            });
          } else {
            this._scotchesService.updateNote(this.scotch._id, this.editedNote).subscribe(scotch => {
              this.selectedNote = null;
              this.editedNote = null;
              this.refreshNeeded.emit('notes');
            });
          }
        }
      });
  }

/***  Notes  ****************/

  addNote() {
    this.newNote = true;
    this.editedNote = new Object();
    this._editDialogService.launchDialog({type: 'note',
                                            title: 'Add Note',
                                            editedObject: this.editedNote,
                                            doLaunch: true});
  }

  editNote(note: any) {
    this.newNote = false;
    this.selectedNote = note;
    this.editedNote = this.cloneNote(note);
    this._editDialogService.launchDialog({type: 'note',
                                            title: 'Edit Note',
                                            editedObject: this.editedNote,
                                            doLaunch: true});
  }

  confirmDeleteNote(bygoneNote: any) {
    this.selectedNote = bygoneNote;
    this._confirmDialogService.launchDialog({type: 'note',
                                            title: 'Delete Note',
                                            prompt: 'Do you want to delete this note?',
                                            doLaunch: true});
  }

  cloneNote(n: any): any {
    const clonedNote = new Object();
    for (const prop of Object.keys(n)) {
      clonedNote[prop] = n[prop];
    }
    return clonedNote;
  }
}
