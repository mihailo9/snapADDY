import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular';

import { setOptions } from '@mobiscroll/angular';

import {
  RoomheaderItemSFC,
  DayheaderItemSFC,
} from '@features/scheduler/scheduler-header-templates/index';
import { SchedulerStore } from '@core/features/scheduler/data/scheduler.store';
import { FromInjector } from '@core/util/from-injector';
import {
  SchedulerEventPopupSFC,
  SchedulerColorPopupSFC,
} from '@core/features/scheduler/scheduler-popup/index';
import {
  SchedulerOptionsService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services/index';

setOptions({
  theme: 'ios',
  themeVariant: 'light',
  clickToCreate: true,
  dragToCreate: true,
  dragToMove: true,
  dragToResize: true,
  eventDelete: true,
});

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-container *ngIf="store?.vm$ | async as vm">
    <mbsc-eventcalendar
      [view]="vm?.view"
      [data]="vm?.events"
      groupBy="date"
      [resources]="vm?.resources"
      [resourceTemplate]="resourceTemp"
      [dayTemplate]="dayTemp"
      [options]="schedulerOptionsService?.calendarOptions"
      [(selectedDate)]="schedulerPopupFormService.calendarSelectedDate"
    >
      <ng-template #resourceTemp let-room>
        <app-room-header-item [room]="room"></app-room-header-item>
      </ng-template>

      <ng-template #dayTemp let-day>
        <app-day-header-item [day]="day"></app-day-header-item>
      </ng-template>
    </mbsc-eventcalendar>
    <app-scheduler-event-popup
      [events]="vm?.events"
    ></app-scheduler-event-popup>
    <app-scheduler-color-popup></app-scheduler-color-popup>
  </ng-container>`,
})
export class SchedulerSFC implements OnInit {
  store = this.fromInjector.get(SchedulerStore);

  protected readonly schedulerOptionsService = this.fromInjector.get(
    SchedulerOptionsService
  );

  protected readonly schedulerPopupFormService = this.fromInjector.get(
    SchedulerPopupFormService
  );

  constructor(private readonly fromInjector: FromInjector) {}

  ngOnInit(): void {}
}

const routes: Routes = [
  {
    path: '',
    component: SchedulerSFC,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    MbscModule,
    RoomheaderItemSFC,
    DayheaderItemSFC,
    SchedulerEventPopupSFC,
    SchedulerColorPopupSFC,
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
