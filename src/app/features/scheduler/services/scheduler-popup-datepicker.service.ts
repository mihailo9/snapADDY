import { Injectable } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';

@Injectable({ providedIn: 'root' })
export class SchedulerPopupDatepickerService {
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false,
    },
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false,
    },
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true,
  };
}
