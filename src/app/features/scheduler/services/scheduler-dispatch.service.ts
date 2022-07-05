/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { IDispatchedEvent } from '@core/models';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SchedulerDispatchService {
  private readonly dispatch: Subject<IDispatchedEvent> = new Subject();

  readonly dispatch$ = this.dispatch.asObservable();

  eventDispatched(event: IDispatchedEvent) {
    this.dispatch.next(event);
  }
}
