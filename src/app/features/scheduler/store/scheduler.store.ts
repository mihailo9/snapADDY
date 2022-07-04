/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */

import { Injectable } from '@angular/core';
import {
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscResource,
} from '@mobiscroll/angular';
import { Observable } from 'rxjs';
import { Appointment, Room } from '@models/index';

import { Store } from '@core/base/store.base';
import { FromInjector } from '@core/util/from-injector';
import { LocalstorageService } from '@core/util/localstorage.service';
import { mapAppointmentsToEvents } from '@core/util/map-appointments-to-events';
import { mapRoomsToResources } from '@core/util/map-rooms-to-resources';

export interface State {
  events: MbscCalendarEvent[];
  resources: MbscResource[];
  view: MbscEventcalendarView;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SchedulerStore extends Store<State> {
  protected _state: State = {
    events: [],
    resources: [],
    view: this.setupSchedulerView(),
    loading: false,
  };

  events$: Observable<MbscCalendarEvent[]> = this.selectPropFromState('events');

  resources$: Observable<MbscResource[]> =
    this.selectPropFromState('resources');

  view$: Observable<MbscEventcalendarView[]> = this.selectPropFromState('view');

  loading$: Observable<boolean> = this.selectPropFromState('loading');

  vm$: Observable<State> = this.initVM();

  constructor(
    protected readonly fromInjector: FromInjector,
    protected readonly localstorageService: LocalstorageService
  ) {
    super(fromInjector);
  }

  updateEvents(events: MbscCalendarEvent[]) {
    this.updateStateProp('events', events);
  }

  updateResurcesFromRooms(rooms: Room[]) {
    const resources = mapRoomsToResources(rooms);

    this.updateStateProp('resources', resources);
  }

  updateEventsFromAppointments(appointments: Appointment[]) {
    const events = mapAppointmentsToEvents(appointments);

    this.updateStateProp('events', events);
  }

  protected initVM(): Observable<State> {
    const projector = (events, resources, view, loading) => {
      const state = {
        events,
        resources,
        view,
        loading,
      };
      this.localstorageService.setData(state, 'schedulerStore');

      return state;
    };

    const props = [this.events$, this.resources$, this.view$, this.loading$];

    return this.setupVM(projector, props);
  }

  private setupSchedulerView(): MbscEventcalendarView {
    return {
      schedule: {
        type: 'week',
        allDay: false,
        startDay: 1,
        endDay: 5,
        startTime: '05:00',
        endTime: '22:00',
      },
    };
  }
}
