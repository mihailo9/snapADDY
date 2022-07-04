/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulerPopupButtonsService {
  popupButtons: any = [];

  popupAddButtons = [
    'cancel',
    {
      handler: () => {
        this._buttonClick$.next();
      },
      keyCode: 'enter',
      text: 'Add',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupEditButtons = [
    'cancel',
    {
      handler: () => {
        this._buttonClick$.next();
      },
      keyCode: 'enter',
      text: 'Save',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];

  private readonly _buttonClick$: Subject<void> = new Subject();

  buttonClick$ = this._buttonClick$.asObservable();

  getPopupButtons(): any[] {
    return this.popupButtons;
  }

  setPopupButtons(buttons) {
    this.popupButtons = [...buttons];
  }

  getPopupAddButtons(): any[] {
    return this.popupAddButtons;
  }

  setPopupAddButtons(buttons) {
    this.popupAddButtons = [...buttons];
  }

  getPopupEditButtons(): any[] {
    return this.popupEditButtons;
  }

  setPopupEdditButtons(buttons) {
    this.popupEditButtons = [...buttons];
  }
}
