import { Injectable } from '@angular/core';
import { users } from '@api/mocks/index';
import { User } from '@models/index';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  getUsers(): Observable<User[]> {
    return of(users);
  }
}
