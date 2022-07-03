/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */

import { Injectable } from '@angular/core';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import { forkJoin, Observable } from 'rxjs';
import { Room, User, Appointment } from '@models/index';
import {
  AppointmentsDataService,
  UsersDataService,
  RoomsDataService,
} from '@api/data/index';
import { Store } from '@core/base/store.base';
import { FromInjector } from '@core/util/from-injector';
import { take } from 'rxjs/operators';

export interface State {
  users: User[];
  rooms: Room[];
  appointments: Appointment[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppStore extends Store<State> {
  protected _state: State = {
    users: [],
    rooms: [],
    appointments: [],
    loading: false,
  };

  users$: Observable<User[]> = this.selectPropFromState('users');

  rooms$: Observable<Room[]> = this.selectPropFromState('rooms');

  loading$: Observable<boolean> = this.selectPropFromState('loading');

  appointments$: Observable<Appointment[]> =
    this.selectPropFromState('appointments');

  vm$: Observable<State> = this.initVM();

  constructor(protected readonly fromInjector: FromInjector) {
    super(fromInjector);
  }

  fetchData() {
    const [_appointments, _rooms, _users] = [
      this.fromInjector.get(AppointmentsDataService).getAppointments(),
      this.fromInjector.get(RoomsDataService).getRooms(),
      this.fromInjector.get(UsersDataService).getUsers(),
    ];
    return forkJoin([_appointments, _rooms, _users])
      .pipe(take(1))
      .subscribe(([appointments, rooms, users]) => {
        this.updateState({
          ...this._state,
          appointments,
          rooms,
          users,
          loading: false,
        });
      });
  }

  protected initVM() {
    const projector = (loading, appointments, users, rooms) => ({
      loading,
      appointments,
      users,
      rooms,
    });

    const props = [this.loading$, this.appointments$, this.users$, this.rooms$];

    return this.setupVM(projector, props);
  }
}
