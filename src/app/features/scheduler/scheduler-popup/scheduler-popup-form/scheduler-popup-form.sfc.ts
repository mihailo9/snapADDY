/* eslint-disable max-len */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  SchedulerPopupFormColorPickerSFC,
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
    <app-scheduler-popup-form-color-picker></app-scheduler-popup-form-color-picker>
  `,
  imports: [
    SchedulerPopupFormTitleSFC,
    SchedulerPopupFormDateSFC,
    SchedulerPopupFormColorPickerSFC,
  ],
})
export class SchedulerPopupFormSFC {}
