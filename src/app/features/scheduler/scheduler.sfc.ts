import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular';

import {
  setOptions,
  MbscCalendarEvent,
  MbscResource,
} from '@mobiscroll/angular';

import {
  RoomheaderItemSFC,
  DayheaderItemSFC,
} from '@features/scheduler/scheduler-header-templates/index';
import { SchedulerStore } from '@core/features/scheduler/data/scheduler.store';
import { FromInjector } from '@core/util/from-injector';
import { SchedulerPopupSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup.sfc';

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
  template: `<ng-container *ngIf="store?.vm$ | async as vm">
    <mbsc-eventcalendar
      [view]="vm?.view"
      [data]="vm?.events"
      groupBy="date"
      [resources]="vm?.resources"
      [resourceTemplate]="resourceTemp"
      [dayTemplate]="dayTemp"
    >
      <ng-template #resourceTemp let-room>
        <app-room-header-item [room]="room"></app-room-header-item>
      </ng-template>

      <ng-template #dayTemp let-day>
        <app-day-header-item [day]="day"></app-day-header-item>
      </ng-template>
    </mbsc-eventcalendar>
    <app-scheduler-popup></app-scheduler-popup>
  </ng-container>`,
})
export class SchedulerSFC implements OnInit {
  store = this.fromInjector.get(SchedulerStore);

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
    SchedulerPopupSFC,
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
