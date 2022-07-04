import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchedulerPopupDatepickerService } from '@core/features/scheduler/services/scheduler-popup-datepicker.service';
import { SchedulerPopupFormService } from '@core/features/scheduler/services/scheduler-popup-form.service';
import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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