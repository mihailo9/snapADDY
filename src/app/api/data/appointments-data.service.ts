import { Injectable } from '@angular/core';
import { appointments } from '@api/mocks/index';
import { LocalstorageService } from '@core/util/localstorage.service';
import { Appointment } from '@models/index';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsDataService {
  constructor(private readonly localstorageService: LocalstorageService) {}
  getAppointments(): Observable<Appointment[]> {
    const appointmentsFromStorage =
      this.localstorageService.getData('appState');

    return appointmentsFromStorage
      ? of(JSON.parse(appointmentsFromStorage).appointments)
      : of(appointments);
  }
}
