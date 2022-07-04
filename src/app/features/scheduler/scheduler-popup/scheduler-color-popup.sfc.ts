import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerPopupColorService } from '@core/features/scheduler/services';
import { FromInjector } from '@core/util/from-injector';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-color-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mbsc-popup
      [options]="schedulerPopupColorService.colorOptions"
      [anchor]="schedulerPopupColorService.colorAnchor"
      #colorPicker
    >
      <div class="crud-color-row">
        <div
          *ngFor="let color of schedulerPopupColorService.colors; let i = index"
        >
          <div
            *ngIf="i < 5"
            class="crud-color-c"
            [ngClass]="{
              selected: schedulerPopupColorService.tempColor === color
            }"
            [attr.data-value]="color"
            (click)="
              schedulerPopupColorService.changeColor(
                $event,
                colorPicker.s.buttons.length
              )
            "
          >
            <div
              class="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
              [ngStyle]="{ background: color }"
            ></div>
          </div>
        </div>
      </div>
      <div class="crud-color-row">
        <div
          *ngFor="let color of schedulerPopupColorService.colors; let i = index"
        >
          <div
            *ngIf="i >= 5"
            class="crud-color-c"
            [ngClass]="{
              selected: schedulerPopupColorService.tempColor === color
            }"
            [attr.data-value]="color"
            (click)="
              schedulerPopupColorService.changeColor(
                $event,
                colorPicker.s.buttons.length
              )
            "
          >
            <div
              class="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
              [ngStyle]="{ background: color }"
            ></div>
          </div>
        </div>
      </div>
    </mbsc-popup>
  `,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MbscModule],
})
export class SchedulerColorPopupSFC implements OnInit {
  @ViewChild('colorPicker', { static: false })
  colorPicker: any;

  protected readonly schedulerPopupColorService = this.fromInjector.get(
    SchedulerPopupColorService
  );

  constructor(private readonly fromInjector: FromInjector) {}

  ngOnInit() {
    this.schedulerPopupColorService.close$.subscribe((evt) => {
      console.log(evt);
      this.colorPicker.close();
    });

    this.schedulerPopupColorService.open$.subscribe((evt) => {
      console.log(evt);
      this.colorPicker.open();
    });
  }
}
