/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {
  SchedulerPopupButtonsService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services';
import { DispatchEventType } from '@core/models';
import { HasOverlapEventsService } from '@core/util/has-overlap-events.service';

import {
  ISnackbarWithAction,
  NotifierService,
} from '@core/util/notifier.service';
import {
  MbscCalendarEvent,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscEventUpdateEvent,
  MbscPopup,
} from '@mobiscroll/angular';
import { EventcalendarBase } from '@mobiscroll/angular/dist/js/core/components/eventcalendar/eventcalendar';

export interface IEventPayload {
  event:
    | MbscEventClickEvent
    | MbscEventCreatedEvent
    | MbscEventUpdateEvent
    | MbscCalendarEvent;
  events: MbscCalendarEvent[];
  popup: MbscPopup;
  callback: (events) => void;
}

@Injectable({ providedIn: 'root' })
export class SchedulerPopupActionsService {
  isEdit: boolean;

  tempEvent!: MbscCalendarEvent;

  tempInst!: EventcalendarBase;

  popupHeaderText!: string;

  popupAnchor: HTMLElement | undefined;

  constructor(
    private readonly schedulerPopupButtonsService: SchedulerPopupButtonsService,
    private readonly schedulerPopupFormService: SchedulerPopupFormService,
    private readonly notifierService: NotifierService,
    private readonly hasOverlapEventsService: HasOverlapEventsService
  ) {}

  actions(type: DispatchEventType, payload: IEventPayload) {
    console.log(type)
    const actions = {
      [DispatchEventType.add]: () => {
        this.saveEvent(payload);
      },
      [DispatchEventType.cancel]: () => {
        this.onEventCancel(payload);
      },
      [DispatchEventType.click]: () => {
        this.onEventClick(payload);
      },
      [DispatchEventType.created]: () => {
        this.onEventCreated(payload);
      },
      [DispatchEventType.deleted]: () => {
        this.onEventDelete(payload);
      },
      [DispatchEventType.edit]: () => {
        this.onEventEdit(payload);
      },
      [DispatchEventType.update]: () => {
        this.onEventUpdate(payload);
      },
      [DispatchEventType.updated]: () => {
        this.onEventUpdate(payload);
      },
    };

    actions[type]();
  }

  private loadPopupForm({ title, start, end }: MbscCalendarEvent): void {
    const form = {
      popupEventTitle: title,
      popupEventDates: [start, end],
    };

    this.schedulerPopupFormService.patchForm(form);
  }

  private saveEvent({ events, popup, callback }: Partial<IEventPayload>): void {
    const mockEventId = (event) =>
      this.isEdit ? event.id : (events[events.length - 1].id as number) + 1;
    const startDate =
      this.schedulerPopupFormService.getControlValue('popupEventDates')[0];
    const endDate =
      this.schedulerPopupFormService.getControlValue('popupEventDates')[1];
    this.tempEvent = {
      ...this.tempEvent,
      title: this.schedulerPopupFormService.getControlValue('popupEventTitle'),
      start: startDate,
      end: endDate,
      id: mockEventId(this.tempEvent),
    };

    if (this.isEdit) {
      const _events = events.map((evt) =>
        evt.id === this.tempEvent.id ? this.tempEvent : evt
      );

      callback(_events);
      this.notifierService.snackbar('Event updated');
    } else {
      callback([...events, this.tempEvent]);
      this.notifierService.snackbar('Event added');
    }

    popup.close();
  }

  private onEventDelete({
    events,
    callback,
    popup,
  }: Partial<IEventPayload>): void {
    const _events = events.filter(
      (item) => item.id !== (this.tempEvent as MbscCalendarEvent).id
    );
    callback([..._events]);

    const snackbarPayload: ISnackbarWithAction = {
      text: 'Undo',
      message: 'Event deleted',
      action: () => {
        callback([..._events, this.tempEvent]);
      },
    };

    this.notifierService.snackbarWithAction(snackbarPayload);
    popup.close();
  }

  private onEventClick({ event, popup }: Partial<IEventPayload>) {
    this.isEdit = true;
    this.tempEvent = event.event;
    this.tempInst = event.inst;
    this.loadPopupForm(event.event);
    this.popupHeaderText = 'Edit event';
    this.schedulerPopupButtonsService.setPopupButtons(
      this.schedulerPopupButtonsService.getPopupEditButtons()
    );
    this.popupAnchor = (event as MbscEventClickEvent).domEvent.currentTarget;
    popup.open();
  }

  private onEventCreated({ event, popup }: Partial<IEventPayload>) {
    this.isEdit = false;
    this.tempEvent = { ...event.event };
    this.loadPopupForm(event.event);
    this.popupHeaderText = 'New Event';
    this.schedulerPopupButtonsService.setPopupButtons(
      this.schedulerPopupButtonsService.getPopupAddButtons()
    );
    this.popupAnchor = (event as MbscEventCreatedEvent).target;
    popup.open();
  }

  private onEventUpdate({
    events,
    event,
    popup,
    callback,
  }: Partial<IEventPayload>) {
    this.isEdit = true;
    this.tempEvent = { ...event.event };
    this.loadPopupForm(event.event);

    this.saveEvent({ events, popup, callback });
  }

  private onEventEdit({ events, popup, callback }: Partial<IEventPayload>) {
    const startDate =
      this.schedulerPopupFormService.getControlValue('popupEventDates')[0];
    const endDate =
      this.schedulerPopupFormService.getControlValue('popupEventDates')[1];
    this.tempEvent = {
      ...this.tempEvent,
      start: startDate,
      end: endDate,
    };

    if (
      this.hasOverlapEventsService.hasOverlap(this.tempEvent, this.tempInst)
    ) {
      popup.close();
      this.notifierService.snackbar('Overlaping events!');
      return false;
    }

    this.saveEvent({ events, popup, callback });
  }

  private onEventCancel({ events, callback }: Partial<IEventPayload>) {
    if (!this.isEdit) {
      events = [...events];
      callback(events);
    }
  }
}
