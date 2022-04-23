import { Component, OnInit, Inject } from '@angular/core';
import {
  alertService,
  User,
  currentUser,
  auth,
} from 'src/app/ajs-upgraded-providers';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormBuilder, FormControl, FormGroup } from '@angular/forms'

type userModel = {
  id: any;
  receive_task_notifications: any;
  receive_feedback_notifications: any;
  receive_portfolio_notifications: any;
};

@Component({
  selector: 'notific-setting',
  templateUrl: './notification.component.html',
  styleUrls: ['./user-notification-settings-modal.scss'],
})
export class notificationComponent implements OnInit {
  User: userModel;
  feedbackControl = new FormControl(false);
  portfolioControl = new FormControl(false);
  taskControl = new FormControl(false);
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
      taskSetting: this.taskControl,
      feedbackSetting: this.feedbackControl,
      portfolioSetting: this.portfolioControl,
    })
  }

  ngOnInit() {
    this.User = {
      id: this.CurrentUser.profile.Id,
      receive_feedback_notifications: this.CurrentUser.profile.receive_feedback_notifications,
      receive_portfolio_notifications: this.CurrentUser.profile.receive_portfolio_notifications,
      receive_task_notifications: this.CurrentUser.profile.receive_task_notifications,
    }
  }

  changeItem(val: string, judge: Boolean) {
    this.User[val] = judge;
  }

  get getClassList() {
    let arr = ['btn', 'btn-default', this.User['receive_task_notifications'] ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList1() {
    let arr = ['btn', 'btn-default', this.User['receive_task_notifications'] ? '' : 'active'];
    return arr.join(' ');
  }
  get getClassList2() {
    let arr = ['btn', 'btn-default', this.User['receive_feedback_notifications'] ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList3() {
    let arr = ['btn', 'btn-default', this.User['receive_feedback_notifications'] ? '' : 'active'];
    return arr.join(' ');
  }
  get getClassList4() {
    let arr = ['btn', 'btn-default', this.User['receive_portfolio_notifications'] ? 'active' : ''];
    return arr.join(' ');
  }
  get getClassList5() {
    let arr = ['btn', 'btn-default', this.User['receive_portfolio_notifications'] ? '' : 'active'];
    return arr.join(' ');
  }

  saveNotifications(f: NgForm) {
    this.CurrentUser.profile.receive_feedback_notifications = f.value.feedbackSetting;
    this.CurrentUser.profile.receive_portfolio_notifications = f.value.portfolioSetting;
    this.CurrentUser.profile.receive_task_notifications = f.value.taskSetting;
    if (this.CurrentUser.profile.Id == this.User.id) {
      this.user.update({id: this.CurrentUser.id, user: this.CurrentUser.profile, Auth_token: this.CurrentUser.authenticationToken})
      this.auth.saveCurrentUser();
      this.alertService.add("success", "Notification settings saved", 6000);
    } else {
      this.alertService.add("danger", "Not authorized", 6000)
    }
  }
}
