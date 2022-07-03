import { Injectable } from '@angular/core';
import { appointments } from '@api/mocks/index';
import { Appointment } from '@models/index';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsDataService {
  getAppointments(): Observable<Appointment[]> {
    return of(appointments);
  }
}
