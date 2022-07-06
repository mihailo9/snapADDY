/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MbscCalendarEvent, MbscModule } from '@mobiscroll/angular';
import {
  RoomheaderItemSFC,
  DayheaderItemSFC,
} from '@features/scheduler/scheduler-header-templates';
import { SchedulerStore } from '@core/features/scheduler/store/scheduler.store';
import { FromInjector } from '@core/util/from-injector';
import { SchedulerEventPopupSFC } from '@core/features/scheduler/scheduler-popup';
import {
  SchedulerDispatchService,
  SchedulerOptionsService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services';
import { AppStore } from '@core/api/store';
import { map, take } from 'rxjs/operators';
import { mapAppointmentsToEvents, mapEventToAppointment } from '@core/util';
import { combineLatest } from 'rxjs';
import { PopupFormEnum } from '@core/models';

import { DispatchEventType } from '@core/models';

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-container *ngIf="combinedStoresVM | async as vm">
    <mbsc-eventcalendar
      [view]="vm?.view"
      [data]="vm?.events"
      groupBy="date"
      [resources]="vm?.resources"
      [resourceTemplate]="resourceTemp"
      [dayTemplate]="dayTemp"
      [options]="schedulerOptionsService?.calendarOptions"
      [selectedDate]="
        schedulerPopupFormService.getControlValue(
          popupFormEnum.calendarSelectedDate
        )
      "
      (selectedDateChange)="
        schedulerPopupFormService.patchForm({ calendarSelectedDate: $event })
      "
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
      [dispatchedEvent]="schedulerDispatchService.dispatch$ | async"
      (updateEvents$)="updateAppointments($event)"
    ></app-scheduler-event-popup>
  </ng-container>`,
})
export class SchedulerSFC {
  appStore = this.fromInjector.get(AppStore);

  store = this.fromInjector.get(SchedulerStore);

  combinedStoresVM = combineLatest([
    this.store.vm$,
    this.appStore.appointments$,
  ]).pipe(
    map(([schedulerVM, appointments]) => ({
      ...schedulerVM,
      events: mapAppointmentsToEvents(appointments),
    }))
  );

  protected readonly popupFormEnum = PopupFormEnum;

  protected readonly dispatchEventTypeEnum = DispatchEventType;

  constructor(
    private readonly fromInjector: FromInjector,
    protected readonly schedulerPopupFormService: SchedulerPopupFormService,
    protected readonly schedulerDispatchService: SchedulerDispatchService,
    protected readonly schedulerOptionsService: SchedulerOptionsService
  ) {}

  protected updateAppointments(events: MbscCalendarEvent[]) {
    const appointments = events.map((evt) => mapEventToAppointment(evt));
    this.appStore.updateAppointments(appointments);
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
    SchedulerEventPopupSFC,
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
