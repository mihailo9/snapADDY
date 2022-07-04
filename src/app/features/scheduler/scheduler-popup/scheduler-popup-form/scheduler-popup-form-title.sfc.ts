import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchedulerPopupFormService } from '@core/features/scheduler/services/index';
import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group">
    <mbsc-input
      label="Title"
      [(ngModel)]="schedulerPopupFormService.popupEventTitle"
    ></mbsc-input>
  </div>`,
  imports: [FormsModule, MbscModule],
})
export class SchedulerPopupFormTitleSFC {
  protected readonly schedulerPopupFormService = this.fromInjector.get(
    SchedulerPopupFormService
  );
  constructor(private readonly fromInjector: FromInjector) {}
}
