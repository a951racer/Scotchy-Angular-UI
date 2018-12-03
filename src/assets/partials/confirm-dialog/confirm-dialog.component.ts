import { Component, Input, OnDestroy } from '@angular/core';

import { ConfirmDialogService } from './confirm-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialog implements OnDestroy {
  @Input() type: String;

  subscription: Subscription;
  confirmDialog: any;
  dialogType: string;
  dialogTitle: string;
  dialogPrompt: string;

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.subscription = confirmDialogService.dialogLaunched.subscribe(
      inputs => {
        this.dialogType = inputs.type;
        this.dialogTitle = inputs.title;
        this.dialogPrompt = inputs.prompt;
        this.confirmDialog = document.getElementById('confirmationDialog' + this.type);
        this.confirmDialog.style.display = 'block';
    });
  }

  close(confirmed) {
    this.confirmDialog = document.getElementById('confirmationDialog' + this.type);
    this.confirmDialog.style.display = 'none';
    this.confirmDialogService.dialogClose({type: this.dialogType, confirmed: confirmed});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
