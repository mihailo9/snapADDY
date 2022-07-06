/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */

import { Injectable } from '@angular/core';
import {
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscResource,
} from '@mobiscroll/angular';
import { Observable } from 'rxjs';
import { Room } from '@models/index';
import { Store } from '@core/base/store.base';
import {
  LocalstorageService,
  mapRoomsToResources,
  FromInjector,
} from '@core/util';

export interface State {
  events: MbscCalendarEvent[];
  resources: MbscResource[];
  view: MbscEventcalendarView;
  loading: boolean;
}

export enum SchedulerState {
  schedulerState = 'schedulerState',
  events = 'events',
  view = 'view',
  loading = 'loading',
  resources = 'resources',
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

  events$: Observable<MbscCalendarEvent[]> = this.selectPropFromState(
    SchedulerState.events
  );

  resources$: Observable<MbscResource[]> = this.selectPropFromState(
    SchedulerState.resources
  );

  view$: Observable<MbscEventcalendarView[]> = this.selectPropFromState(
    SchedulerState.view
  );

  loading$: Observable<boolean> = this.selectPropFromState(
    SchedulerState.loading
  );

  vm$: Observable<State> = this.initVM();

  constructor(
    protected readonly fromInjector: FromInjector,
    protected readonly localstorageService: LocalstorageService
  ) {
    super(fromInjector);
  }

  updateResurcesFromRooms(rooms: Room[]) {
    const resources = mapRoomsToResources(rooms);

    this.updateStateProp(SchedulerState.resources, resources);
  }

  updateEvents(events: MbscCalendarEvent[]) {
    let schedulerState = JSON.parse(
      this.localstorageService.getData(SchedulerState.schedulerState)
    );

    schedulerState = {
      ...schedulerState,
      events,
    };

    this.localstorageService.setData(
      schedulerState,
      SchedulerState.schedulerState
    );

    this.updateStateProp(SchedulerState.events, events);
  }

  protected initVM(): Observable<State> {
    const projector = (events, resources, view, loading) => {
      const state = {
        events,
        resources,
        view,
        loading,
      };
      this.localstorageService.setData(state, SchedulerState.schedulerState);

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
