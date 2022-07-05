/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IPopupForm } from '@core/models/IPopupForm';
import { DateType } from '@mobiscroll/angular/dist/js/core/util/datetime';

@Injectable({ providedIn: 'root' })
export class SchedulerPopupFormService {
  _form: FormGroup = this.fb.group({
    popupEventTitle: null,
    popupEventDates: null,
    calendarSelectedDate: new Date() as DateType,
  });

  get form(): FormGroup {
    return this._form;
  }

  constructor(private readonly fb: FormBuilder) {}

  formSnapshot(): IPopupForm {
    return this._form.getRawValue();
  }

  patchForm(payload: Partial<IPopupForm>) {
    this._form.patchValue(payload);
  }

  getControl(key: string): AbstractControl {
    return this._form.get(key);
  }

  getControlValue(key: string): any {
    return this.getControl(key).value;
  }
}
