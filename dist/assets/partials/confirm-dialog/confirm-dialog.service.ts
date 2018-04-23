import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfirmDialogService {

  // Observable string sources
  private dialogLaunchSource = new Subject<any>();
  private dialogResponseSource = new Subject<any>();

  // Observable string streams
  dialogLaunched = this.dialogLaunchSource.asObservable();
  dialogResponded = this.dialogResponseSource.asObservable();

  // Service message commands
  launchDialog(inputs: any) {
    this.dialogLaunchSource.next(inputs);
  }

  dialogClose(inputs: any) {
    this.dialogResponseSource.next(inputs);
  }
}
