/* eslint-disable max-len */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { SchedulerPopupFormColorPickerSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup-form/scheduler-popup-form-color-picker.sfc';
import { SchedulerPopupFormDateSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup-form/scheduler-popup-form-date.sfc';
import { SchedulerPopupFormTitleSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup-form/scheduler-popup-form-title.sfc';

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
