import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SchedulerPopupDatepickerService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services/index';

import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group">
    <mbsc-datepicker
      [(ngModel)]="schedulerPopupFormService.popupEventDates"
      [options]="schedulerPopupDatepickerService.datePickerOptions"
      [controls]="schedulerPopupDatepickerService.datetimePickerControls"
      [startInput]="startInput"
      [endInput]="endInput"
    ></mbsc-datepicker>
    <mbsc-input #startInput label="Starts"></mbsc-input>
    <mbsc-input #endInput label="Ends"></mbsc-input>
  </div>`,
  imports: [FormsModule, MbscModule],
})
export class SchedulerPopupFormDateSFC {
  protected readonly schedulerPopupFormService = this.fromInjector.get(
    SchedulerPopupFormService
  );

  protected readonly schedulerPopupDatepickerService = this.fromInjector.get(
    SchedulerPopupDatepickerService
  );
  constructor(private readonly fromInjector: FromInjector) {}
}
