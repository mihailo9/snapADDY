/* eslint-disable max-len */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  SchedulerPopupFormDateSFC,
  SchedulerPopupFormTitleSFC,
} from '@core/features/scheduler/scheduler-popup/scheduler-popup-form';
import { IPopupForm } from '@core/models/IPopupForm';

@Component({
  selector: 'app-scheduler-popup-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-scheduler-popup-form-title [title]="form.popupEventTitle"></app-scheduler-popup-form-title>
    <app-scheduler-popup-form-date [dates]="form.popupEventDates"></app-scheduler-popup-form-date>
  `,
  imports: [SchedulerPopupFormTitleSFC, SchedulerPopupFormDateSFC],
})
export class SchedulerPopupFormSFC {
  @Input() form: IPopupForm;
}
