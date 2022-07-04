/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { DispatchEventType, IDispatchedEvent } from '@core/models';
import {
  MbscEventcalendarOptions,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscEventCreateEvent,
  MbscEventDeletedEvent,
  MbscEventUpdatedEvent,
  MbscEventUpdateEvent,
} from '@mobiscroll/angular';
import { merge, Subject } from 'rxjs';

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

  readonly mergedEvents$ = merge(
    this.eventClick$,
    this.eventCreate$,
    this.eventCreated$,
    this.eventDeleted$,
    this.eventUpdate$,
    this.eventUpdated$
  );

  private readonly dispatch: Subject<IDispatchedEvent> = new Subject();

  readonly dispatch$ = this.dispatch.asObservable();

  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      schedule: { type: 'week' },
    },
    onEventClick: (args) => {
      this.eventDispatched({
        type: DispatchEventType.click,
        event: args,
      });
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.eventDispatched({
          type: DispatchEventType.created,
          event: args,
        });
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.eventDispatched({
          type: DispatchEventType.deleted,
          event: args,
        });
      });
    },
    onEventUpdated: (args) => {
      this.eventDispatched({
        type: DispatchEventType.updated,
        event: args,
      });
    },
    onEventCreate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.eventDispatched({
        type: DispatchEventType.create,
        event: args,
      });
    },
    onEventUpdate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.eventDispatched({
        type: DispatchEventType.update,
        event: args,
      });
    },
  };

  eventDispatched(event: IDispatchedEvent) {
    this.dispatch.next(event);
  }

  private hasOverlap(args, inst) {
    const ev = args.event;
    const events = inst
      .getEvents(ev.start, ev.end)
      .filter((e) => e.id !== ev.id);

    return events.length > 0;
  }
}
