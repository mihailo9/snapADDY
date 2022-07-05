/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SchedulerDispatchService } from '@core/features/scheduler/services';
import { DispatchEventType } from '@core/models';
import { FromInjector } from '@core/util/from-injector';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';

@Injectable({
  providedIn: 'root',
})
export class SchedulerOptionsService {
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      schedule: { type: 'week' },
    },
    onEventClick: (args) => {
      this.schedulerDispatchService.eventDispatched({
        type: DispatchEventType.click,
        event: args,
      });
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.schedulerDispatchService.eventDispatched({
          type: DispatchEventType.created,
          event: args,
        });
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.schedulerDispatchService.eventDispatched({
          type: DispatchEventType.deleted,
          event: args,
        });
      });
    },
    onEventUpdated: (args) => {
      this.schedulerDispatchService.eventDispatched({
        type: DispatchEventType.updated,
        event: args,
      });
    },
    onEventCreate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.schedulerDispatchService.eventDispatched({
        type: DispatchEventType.create,
        event: args,
      });
    },
    onEventUpdate: (args, inst) => {
      if (this.hasOverlap(args, inst)) {
        return false;
      }
      this.schedulerDispatchService.eventDispatched({
        type: DispatchEventType.update,
        event: args,
      });
    },
  };

  private readonly schedulerDispatchService = this.fromInjector.get(
    SchedulerDispatchService
  );

  constructor(private readonly fromInjector: FromInjector) {}

  private hasOverlap(args, inst) {
    const ev = args.event;
    const events = inst
      .getEvents(ev.start, ev.end)
      .filter((e) => e.id !== ev.id);

    return events.length > 0;
  }
}
