import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { notificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationSettingsModalService {
  constructor(public dialog: MatDialog) {}

  public show(task: any) {
    let dialogRef: MatDialogRef<notificationComponent, any>;
    dialogRef = this.dialog.open(notificationComponent, {
      panelClass: 'custom-dialog-class',
    });
  }
}