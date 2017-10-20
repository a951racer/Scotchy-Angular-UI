// import {OverlayRef, GlobalPositionStrategy} from '@angular/cdk/overlay';
// import {filter, first, RxChain} from '@angular/cdk/rxjs';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class ConfirmDialogRef<HTMLElement> {
  // componentInstance: T;

  private _afterOpen = new Subject<void>();

  private _afterClosed = new Subject<any>();

  private _beforeClose = new Subject<any>();

  private _result: any;

  constructor(private _dialogRef: any) { }

  close(dialogResult?: any): void {
    console.log('close');
    this._result = dialogResult;
    this._beforeClose.next(dialogResult);
    this._beforeClose.complete();
    this._dialogRef.style.display = 'none';
    this._afterClosed.next(dialogResult);
    this._afterClosed.complete();
  }

  afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<any> {
    return this._beforeClose.asObservable();
  }
}
