/* eslint-disable max-len */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  SchedulerPopupFormDateSFC,
  SchedulerPopupFormTitleSFC,
} from '@core/features/scheduler/scheduler-popup/scheduler-popup-form';

import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container [formGroup]="form">
      <app-scheduler-popup-form-title
        [form]="form"
      ></app-scheduler-popup-form-title>
      <app-scheduler-popup-form-date
        [form]="form"
      ></app-scheduler-popup-form-date>
    </ng-container>
  `,
  imports: [
    ReactiveFormsModule,
    SchedulerPopupFormTitleSFC,
    SchedulerPopupFormDateSFC,
    MbscModule,
  ],
})
export class SchedulerPopupFormSFC {
  @Input() form: FormGroup;
}
