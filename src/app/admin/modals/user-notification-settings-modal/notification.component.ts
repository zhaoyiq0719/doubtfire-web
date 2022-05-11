import { Component, OnInit, Inject } from '@angular/core';
import {
  alertService,
  currentUser,
  auth,
  User
} from 'src/app/ajs-upgraded-providers';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'df-notific-setting',
  templateUrl: './notification.component.html',
  styleUrls: ['./user-notification-settings-modal.scss'],
})
export class notificationComponent implements OnInit {
  notificationSettings: FormGroup;
  classList: Array<string>;
  config = {
    animated: true, 
    keyboard: true, 
    backdrop: true,
    ignoreBackdropClick: false, 
  };
  constructor(
    public dialogRef: MatDialogRef<notificationComponent>,
    formBuilder: FormBuilder,
    @Inject(currentUser) public CurrentUser,
    @Inject(alertService) private alertService,
    @Inject(auth) private auth,
    @Inject(User) private user,
  ) {
    this.notificationSettings = formBuilder.group({
      taskSetting: new FormControl(),
      feedbackSetting: new FormControl(),
      portfolioSetting: new FormControl(),
    })
  }

  ngOnInit() {
    this.notificationSettings.setValue({
      taskSetting: this.CurrentUser.profile.receive_task_notifications,
      feedbackSetting: this.CurrentUser.profile.receive_feedback_notifications,
      portfolioSetting: this.CurrentUser.profile.receive_portfolio_notifications
    }); 

  }

  // Define the method of changing the radio button style, to simulate styles of previous Angular/Bootstrap version
  changeItem(setting: string, status: Boolean) {
    this.notificationSettings.value[setting] = status;
  }

  // Actions when 'save'
  saveNotifications(f: NgForm) {
    this.CurrentUser.profile.receive_feedback_notifications = f.value.feedbackSetting;
    this.CurrentUser.profile.receive_portfolio_notifications = f.value.portfolioSetting;
    this.CurrentUser.profile.receive_task_notifications = f.value.taskSetting;
    if (this.CurrentUser) {
      this.user.update({id: this.CurrentUser.id, user: this.CurrentUser.profile, Auth_token: this.CurrentUser.authenticationToken})
      this.auth.saveCurrentUser();
      this.alertService.add('success', 'Notification settings saved', 6000);
    } else {
      this.alertService.add('danger', 'Not authorized', 6000)
    }
  }
}
