import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular';
import {
  HttpClientModule,
  HttpClientJsonpModule,
  HttpClient,
} from '@angular/common/http';
import {
  setOptions,
  MbscEventcalendarView,
  MbscCalendarEvent,
  MbscResource,
} from '@mobiscroll/angular';

import {
  RoomheaderItemSFC,
  DayheaderItemSFC,
} from '@features/scheduler/scheduler-header-templates/index';

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
  template: ` <mbsc-eventcalendar
    [view]="view"
    [data]="myEvents"
    groupBy="date"
    [resources]="myResources"
    [resourceTemplate]="resourceTemp"
    [dayTemplate]="dayTemp"
  >
    <ng-template #resourceTemp let-room>
      <app-room-header-item [room]="room"></app-room-header-item>
    </ng-template>

    <ng-template #dayTemp let-day>
      <app-day-header-item [day]="day"></app-day-header-item>
    </ng-template>
  </mbsc-eventcalendar>`,
})
export class SchedulerSFC implements OnInit {
  view: MbscEventcalendarView = {
    schedule: {
      type: 'week',
      allDay: false,
      startDay: 1,
      endDay: 5,
      startTime: '05:00',
      endTime: '22:00',
    },
  };

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

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .jsonp<MbscCalendarEvent[]>(
        'https://trial.mobiscroll.com/resource-events/',
        'callback'
      )
      .subscribe((resp) => {
        this.myEvents = resp;
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
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
