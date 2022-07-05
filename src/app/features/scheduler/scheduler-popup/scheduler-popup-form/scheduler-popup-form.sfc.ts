/* eslint-disable max-len */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  SchedulerPopupFormDateSFC,
  SchedulerPopupFormTitleSFC,
} from '@core/features/scheduler/scheduler-popup/scheduler-popup-form';

@Component({
  selector: 'app-scheduler-popup-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-scheduler-popup-form-title></app-scheduler-popup-form-title>
    <app-scheduler-popup-form-date></app-scheduler-popup-form-date>
  `,
  imports: [SchedulerPopupFormTitleSFC, SchedulerPopupFormDateSFC],
})
export class SchedulerPopupFormSFC {}
