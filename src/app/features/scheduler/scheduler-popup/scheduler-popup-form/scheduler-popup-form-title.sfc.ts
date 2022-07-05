import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-popup-form-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="mbsc-form-group">
    <ng-container [formGroup]="form">
      <mbsc-input label="Title" formControlName="popupEventTitle"></mbsc-input>
    </ng-container>
  </div>`,
  imports: [MbscModule, ReactiveFormsModule],
})
export class SchedulerPopupFormTitleSFC {
  @Input() form: FormGroup;
}
