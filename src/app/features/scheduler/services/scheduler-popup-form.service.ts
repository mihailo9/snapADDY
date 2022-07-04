import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SchedulerPopupFormService {
  popupEventTitle: string | undefined;
  popupEventDates: any;
  calendarSelectedDate: any = new Date();
  switchLabel: any = 'All-day';
}
