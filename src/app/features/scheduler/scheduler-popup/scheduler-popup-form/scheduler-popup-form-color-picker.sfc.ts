import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchedulerPopupColorService } from '@core/features/scheduler/services/index';
import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-color-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div
    class="event-color-c"
    (click)="schedulerPopupColorService.openColorPicker($event)"
  >
    <div class="event-color-label">Color</div>
    <div
      class="event-color"
      [ngStyle]="{ background: schedulerPopupColorService.selectedColor }"
    ></div>
  </div>`,
  imports: [CommonModule, FormsModule, MbscModule],
})
export class SchedulerPopupFormColorPickerSFC {
  protected readonly schedulerPopupColorService = this.fromInjector.get(
    SchedulerPopupColorService
  );
  constructor(private readonly fromInjector: FromInjector) {}
}
