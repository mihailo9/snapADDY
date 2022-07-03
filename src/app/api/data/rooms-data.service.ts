import { Injectable } from '@angular/core';
import { rooms } from '@api/mocks/index';
import { Room } from '@models/index';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsDataService {
  getRooms(): Observable<Room[]> {
    return of(rooms);
  }
}
