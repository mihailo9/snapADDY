import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SchedulerPopupDatepickerService } from '@core/features/scheduler/services';

import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group" [formGroup]="form">
    <mbsc-datepicker
      formControlName="popupEventDates"
      [options]="schedulerPopupDatepickerService.datePickerOptions"
      [controls]="schedulerPopupDatepickerService.datetimePickerControls"
      [startInput]="startInput"
      [endInput]="endInput"
    ></mbsc-datepicker>
    <mbsc-input #startInput label="Starts"></mbsc-input>
    <mbsc-input #endInput label="Ends"></mbsc-input>
  </div>`,
  imports: [ReactiveFormsModule, MbscModule],
})
export class SchedulerPopupFormDateSFC {
  @Input() form: FormGroup;

  constructor(
    protected readonly schedulerPopupDatepickerService: SchedulerPopupDatepickerService
  ) {}
}
