/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { MbscPopupOptions } from '@mobiscroll/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulerPopupOptionsService {
  private readonly popupClose: Subject<void> = new Subject();

  readonly popupClose$ = this.popupClose.asObservable();

  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      this.popupClose.next();
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

  getPopupOptions(): MbscPopupOptions {
    return this.popupOptions;
  }
}
