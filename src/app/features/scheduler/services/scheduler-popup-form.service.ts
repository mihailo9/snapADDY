import { Injectable } from '@angular/core';
import { IPopupForm } from '@core/models/IPopupForm';
import { DateType } from '@mobiscroll/angular/dist/js/core/util/datetime';

@Injectable({ providedIn: 'root' })
export class SchedulerPopupFormService {
  form: IPopupForm = {
    popupEventTitle: null,
    popupEventDates: null,
    calendarSelectedDate: new Date() as DateType,
  };
}
