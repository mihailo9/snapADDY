import { Injectable } from '@angular/core';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import { EventcalendarBase } from '@mobiscroll/angular/dist/js/core/components/eventcalendar/eventcalendar';

@Injectable({ providedIn: 'root' })
export class HasOverlapEventsService {
  hasOverlap(event: MbscCalendarEvent, inst: EventcalendarBase) {
    const ev = event;
    const events = inst.getEvents(ev.start, ev.end).filter((e) => {
      if (e.resource !== ev.resource) {
        return;
      }

      return e.id !== ev.id;
    });

    return events.length > 0;
  }
}
