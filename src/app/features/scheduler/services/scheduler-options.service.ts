/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import {
  MbscEventcalendarOptions,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscEventCreateEvent,
  MbscEventDeletedEvent,
  MbscEventUpdatedEvent,
  MbscEventUpdateEvent,
} from '@mobiscroll/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulerOptionsService {
  private readonly eventClick: Subject<MbscEventClickEvent> = new Subject();

  private readonly eventCreated: Subject<MbscEventCreatedEvent> = new Subject();

  private readonly eventDeleted: Subject<MbscEventDeletedEvent> = new Subject();

  private readonly eventUpdated: Subject<MbscEventUpdatedEvent> = new Subject();

  private readonly eventCreate: Subject<MbscEventCreateEvent> = new Subject();

  private readonly eventUpdate: Subject<MbscEventUpdateEvent> = new Subject();

  readonly eventClick$ = this.eventClick.asObservable();

  readonly eventCreated$ = this.eventCreated.asObservable();

  readonly eventDeleted$ = this.eventDeleted.asObservable();

  readonly eventUpdated$ = this.eventUpdated.asObservable();

  readonly eventCreate$ = this.eventCreate.asObservable();

  readonly eventUpdate$ = this.eventUpdate.asObservable();

  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      schedule: { type: 'week' },
    },
    onEventClick: (args) => {
      this.eventClick.next(args);
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.eventCreated.next(args);
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.eventDeleted.next(args);
      });
    },
    onEventUpdated: (args) => {
      this.eventUpdated.next(args);
    },
    onEventCreate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.eventCreate.next(args);
    },
    onEventUpdate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.eventUpdate.next(args);
    },
  };

  private hasOverlap(args, inst) {
    const ev = args.event;
    const events = inst
      .getEvents(ev.start, ev.end)
      .filter((e) => e.id !== ev.id);

    return events.length > 0;
  }
}
