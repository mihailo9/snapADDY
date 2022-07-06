/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SchedulerDispatchService } from '@core/features/scheduler/services';
import { DispatchEventType } from '@core/models';
import { FromInjector } from '@core/util';
import { MbscPopupOptions } from '@mobiscroll/angular';

@Injectable({
  providedIn: 'root',
})
export class SchedulerPopupOptionsService {
  private readonly schedulerDispatchService = this.fromInjector.get(
    SchedulerDispatchService
  );

  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      const payload = { type: DispatchEventType.cancel, event: null };
      this.schedulerDispatchService.eventDispatched(payload);
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    },
  };

  constructor(private readonly fromInjector: FromInjector) {}

  getPopupOptions(): MbscPopupOptions {
    return this.popupOptions;
  }
}
