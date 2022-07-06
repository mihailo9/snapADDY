/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SchedulerDispatchService } from '@core/features/scheduler/services';
import { DispatchEventType } from '@core/models';
import { HasOverlapEventsService, NotifierService } from '@core/util';
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
      if (this.hasOverlapEventsService.hasOverlap(args.event, inst)) {
        return false;
      }
    },
    onEventUpdate: (args, inst) => {
      if (this.hasOverlapEventsService.hasOverlap(args.event, inst)) {
        this.notifierService.snackbar('Overlaping events!');
        return false;
      }
    },
  };

  constructor(
    private readonly schedulerDispatchService: SchedulerDispatchService,
    private readonly notifierService: NotifierService,
    private readonly hasOverlapEventsService: HasOverlapEventsService
  ) {}
}
