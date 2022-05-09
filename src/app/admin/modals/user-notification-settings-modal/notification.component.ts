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
  // User: userModel;
  feedbackControl = new FormControl();
  portfolioControl = new FormControl();
  taskControl = new FormControl();
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
    fb: FormBuilder,
    @Inject(currentUser) public CurrentUser,
    @Inject(alertService) private alertService,
    @Inject(auth) private auth,
    @Inject(User) private user,
  ) {
    this.notificationSettings = fb.group({
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

  // Define the methods of changing the radio button style, to simulate styles of previous Angular/Bootstrap version
  changeItem(val: string, judge: Boolean) {
    this.notificationSettings.value[val] = judge;
  }

  get getClassList() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.taskSetting ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList1() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.taskSetting ? '' : 'active'];
    return arr.join(' ');
  }
  get getClassList2() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.feedbackSetting ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList3() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.feedbackSetting ? '' : 'active'];
    return arr.join(' ');
  }
  get getClassList4() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.portfolioSetting ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList5() {
    let arr = ['btn', 'btn-default', this.notificationSettings.value.portfolioSetting ? '' : 'active'];
    return arr.join(' ');
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
