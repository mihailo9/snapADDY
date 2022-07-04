import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-delete-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
