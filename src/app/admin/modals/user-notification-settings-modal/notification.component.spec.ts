import { ComponentFixture, TestBed } from '@angular/core/testing';

import { notificationComponent } from './notification.component';

import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, ReactiveFormsModule, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {
  alertService,
  User,
  currentUser,
  auth,
} from 'src/app/ajs-upgraded-providers';

describe('notificationComponent', () => {
  let component: notificationComponent;
  let fixture: ComponentFixture<notificationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [notificationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        FormBuilder,
        {provide: FormGroup, useValue: {
          taskSetting: true,
          feedbackSetting: true,
          portfolioSetting: true,
        }},
        FormControl,
        {provide: currentUser, useValue: {
          profile:{
            Id: 1,
            receive_feedback_notifications: true,
            receive_portfolio_notifications: true,
            receive_task_notifications: true,
          }
        }},
        {provide: alertService, useValue: {}},
        {provide: auth, useValue: {}},
        {provide: User, useValue: {}},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(notificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
