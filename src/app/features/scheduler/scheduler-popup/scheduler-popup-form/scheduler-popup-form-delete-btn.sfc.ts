import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SchedulerDispatchService } from '@core/features/scheduler/services';
import { MbscModule } from '@mobiscroll/angular';
import { DispatchEventType } from '@core/models';

@Component({
  selector: 'app-scheduler-popup-form-delete-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <mbsc-button
    class="mbsc-button-block"
    color="danger"
    variant="outline"
    (click)="
      schedulerDispatchService.eventDispatched({
        event: null,
        type: dispatchEventType.deleted
      })
    "
    >Delete event
  </mbsc-button>`,
  imports: [MbscModule],
})
export class SchedulerPopupFormDeleteBtnSFC {
  protected dispatchEventType = DispatchEventType;

  constructor(
    protected readonly schedulerDispatchService: SchedulerDispatchService
  ) {}
}
