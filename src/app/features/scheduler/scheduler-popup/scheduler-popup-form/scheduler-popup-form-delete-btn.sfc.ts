import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-delete-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mbsc-button
    class="mbsc-button-block"
    color="danger"
    variant="outline"
    (click)="click$.emit()"
    >Delete event
  </mbsc-button>`,
  imports: [MbscModule],
})
export class SchedulerPopupFormDeleteBtnSFC {
  @Output() protected readonly click$: EventEmitter<void> = new EventEmitter();
}
