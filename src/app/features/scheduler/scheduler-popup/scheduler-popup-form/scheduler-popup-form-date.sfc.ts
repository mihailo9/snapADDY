import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SchedulerPopupDatepickerService,
} from '@core/features/scheduler/services';

import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group">
    <mbsc-datepicker
      [(ngModel)]="dates"
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
  @Input() dates: any[];

  protected readonly schedulerPopupDatepickerService = this.fromInjector.get(
    SchedulerPopupDatepickerService
  );
  constructor(private readonly fromInjector: FromInjector) {}
}
