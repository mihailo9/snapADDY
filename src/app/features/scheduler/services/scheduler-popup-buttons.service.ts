/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SchedulerDispatchService } from '@core/features/scheduler/services';
import { DispatchEventType,  } from '@core/models';
import { FromInjector } from '@core/util/from-injector';

@Injectable({
  providedIn: 'root',
})
export class SchedulerPopupButtonsService {
  private readonly schedulerDispatchService = this.fromInjector.get(
    SchedulerDispatchService
  );
  popupButtons: any = [];

  popupAddButtons = [
    'cancel',
    {
      handler: () => {
        const payload = {type: DispatchEventType.add, event: null };
        this.schedulerDispatchService.eventDispatched(payload);
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
        const payload = {type: DispatchEventType.edit, event: null };
        this.schedulerDispatchService.eventDispatched(payload);
      },
      keyCode: 'enter',
      text: 'Save',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];

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

  constructor(private readonly fromInjector: FromInjector) {}
}
