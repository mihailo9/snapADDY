import { Component, NgModule, OnInit } from '@angular/core';
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
  </ng-container>`,
})
export class SchedulerSFC implements OnInit {
  store = this.fromInjector.get(SchedulerStore);

  myEvents: MbscCalendarEvent[] = [];

  myResources: MbscResource[] = [
    {
      id: 1,
      name: 'Ryan',
      color: '#f7c4b4',
      img: 'https://img.mobiscroll.com/demos/m1.png',
    },
    {
      id: 2,
      name: 'Kate',
      color: '#c6f1c9',
      img: 'https://img.mobiscroll.com/demos/f1.png',
    },
    {
      id: 3,
      name: 'John',
      color: '#e8d0ef',
      img: 'https://img.mobiscroll.com/demos/m2.png',
    },
  ];

  constructor(private readonly fromInjector: FromInjector) {}

  ngOnInit(): void {
    // this.appStore.vm$.subscribe(a => {
    //   console.log(a)
    // })
    // this.schedulerStore.buildEvents().subscribe((a) => {
    //   console.log(a);
    //   this.myEvents = a;
    // });
    // this.http
    //   .jsonp<MbscCalendarEvent[]>(
    //     'https://trial.mobiscroll.com/resource-events/',
    //     'callback'
    //   )
    //   .subscribe((resp) => {
    //     console.log(resp);
    //     this.myEvents = resp;
    //   });
    this.store.vm$.subscribe((c) => {
      console.log(c);
    });
  }
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
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
