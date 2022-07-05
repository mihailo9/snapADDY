import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group">
    <mbsc-input label="Title" [(ngModel)]="title"></mbsc-input>
  </div>`,
  imports: [FormsModule, MbscModule],
})
export class SchedulerPopupFormTitleSFC {
  @Input() title: string;
}
