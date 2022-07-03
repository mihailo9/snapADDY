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

  constructor(protected readonly fromInjector: FromInjector) {
    super(fromInjector);
  }

  updateResurces(rooms: Room[]) {
    const resources = this.mapToResources(rooms);

    this.updateStateProp('resources', resources);
  }

  updateEvents(appointments: Appointment[]) {
    const events = this.mapToEvents(appointments);

    this.updateStateProp('events', events);
  }

  protected initVM(): Observable<State> {
    const projector = (events, resources, view, loading) => ({
      events,
      resources,
      view,
      loading,
    });

    const props = [this.events$, this.resources$, this.view$, this.loading$];

    return this.setupVM(projector, props);
  }

  private mapToResources(rooms: Room[]): MbscResource[] {
    return rooms.map(({ id, name, numberOfPeople }) => ({
      id,
      name,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
  }

  private mapToEvents(appointments: Appointment[]): MbscCalendarEvent[] {
    return appointments.map((appointment) => ({
      start: appointment.startDate,
      end: appointment.endDate,
      id: appointment.id,
      title: appointment.title,
      resource: appointment.roomId,
    }));
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
