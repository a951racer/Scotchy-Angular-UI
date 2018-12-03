import { Component, Input, OnDestroy } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { EditDialogService } from './edit-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html'
})

export class EditDialog implements OnDestroy {
  @Input() type: String;

  subscription: Subscription;
  editDialog: any;
  dialogType: string;
  dialogTitle: string;
  editedObject: any;

  constructor(private editDialogService: EditDialogService) {
    this.subscription = editDialogService.dialogLaunched.subscribe(
      inputs => {
        this.dialogType = inputs.type;
        this.dialogTitle = inputs.title;
        this.editedObject = inputs.editedObject;
        this.editDialog = document.getElementById('editDialog' + this.type);
        this.editDialog.style.display = 'block';
    });
  }

  close(confirmed) {
    this.editDialog = document.getElementById('editDialog' + this.type);
    this.editDialog.style.display = 'none';
    this.editDialogService.dialogClose({type: this.dialogType, confirmed: confirmed});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
