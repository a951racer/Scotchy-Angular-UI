import {Component, OnInit } from '@angular/core';
import { ConfirmDialogRef } from './confirm-dialog-ref.component';
import {
  ComponentRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  TemplateRef,
} from '@angular/core';
import {ComponentPortal, ComponentType, PortalInjector, TemplatePortal} from '@angular/cdk/portal';
import {extendObject} from '@angular/material/core';
import {Observable} from 'rxjs/Observable';
import {defer} from 'rxjs/observable/defer';
import {Subject} from 'rxjs/Subject';
import {of as observableOf} from 'rxjs/observable/of';

/**
 * Service to open Material Design modal dialogs.
 */
 @Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
  })

@Injectable() export class ConfirmDialog {
  public dialogTitle: string;
  public dialogPrompt: string;
  public dialogRef: any;
  public confirmDialog: any;

  // private _afterOpen = new Subject<void>();
  private _afterClosed = new Subject<any>();
  // private _beforeClose = new Subject<any>();
  // private _result: any;

//  get afterOpen(): Subject<ConfirmDialogRef<any>> {
//    return this._afterOpen;
//  }

  constructor() {  }
      // private _overlay: Overlay,
      // private _injector: Injector,
      // @Optional() location: Location,
      // @Inject(MAT_DIALOG_SCROLL_STRATEGY) private _scrollStrategy,
      // @Optional() @SkipSelf() private _parentDialog: ConfirmDialog

  /**
   * Opens a modal dialog containing the given component.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open(title: string, prompt: string): ConfirmDialog {
    console.log('open');
    this.dialogTitle = title;
    this.dialogPrompt = prompt;
    this.confirmDialog = document.getElementById('confirmationDialog');
    this.confirmDialog.style.display = 'block';

    return this;
  }

  close(dialogResult?: any): void {
    // this._result = dialogResult;
    // this._beforeClose.next(dialogResult);
    // this._beforeClose.complete();
    this.confirmDialog = document.getElementById('confirmationDialog');
    this.confirmDialog.style.display = 'none';
    this._afterClosed.next(dialogResult);
    this._afterClosed.complete();
    console.log('::' + this._afterClosed);
  }

//  afterOpen(): Observable<void> {
//    return this._afterOpen.asObservable();
//  }

  afterClosed(): Observable<any> {
    console.log('afterClosed: ');
    return this._afterClosed.asObservable();
  }

//  beforeClose(): Observable<any> {
//    return this._beforeClose.asObservable();
//  }
}
