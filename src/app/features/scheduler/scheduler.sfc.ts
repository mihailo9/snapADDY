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
import {
  SchedulerEventPopupSFC,
  SchedulerColorPopupSFC,
} from '@core/features/scheduler/scheduler-popup';
import {
  SchedulerOptionsService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services';
import { AppStore } from '@core/api/store';
import { map } from 'rxjs/operators';
import { mapAppointmentsToEvents } from '@core/util/map-appointments-to-events';
import { combineLatest } from 'rxjs';
import { mapEventToAppointment } from '@core/util/map-event-to-appointment';
import { DispatchEventType } from '@core/models/IDispatchedEvent';

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
      [dispatchedEvent]="schedulerOptionsService.dispatch$ | async"
      (updateEvents$)="updateAppointments($event)"
    ></app-scheduler-event-popup>

    <app-scheduler-color-popup></app-scheduler-color-popup>
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

  protected readonly dispatchEventTypeEnum = DispatchEventType;

  protected readonly schedulerOptionsService = this.fromInjector.get(
    SchedulerOptionsService
  );

  protected readonly schedulerPopupFormService = this.fromInjector.get(
    SchedulerPopupFormService
  );

  constructor(private readonly fromInjector: FromInjector) {}

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
    SchedulerColorPopupSFC,
  ],
  declarations: [SchedulerSFC],
})
export class SchedulerModule {}
