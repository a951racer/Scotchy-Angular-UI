import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EditDialogService {

  // Observable string sources
  private dialogLaunchSource = new Subject<any>();
  private dialogResponseSource = new Subject<any>();

  // Observable string streams
  dialogLaunched = this.dialogLaunchSource.asObservable();
  dialogResponded = this.dialogResponseSource.asObservable();

  // Service message commands
  launchDialog(inputs: any) {
    console.log(inputs);
    this.dialogLaunchSource.next(inputs);
    console.log('next');
  }

  dialogClose(inputs: any) {
    this.dialogResponseSource.next(inputs);
  }
}
