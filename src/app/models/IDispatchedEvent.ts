import {
  MbscCalendarEvent,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscEventCreateEvent,
  MbscEventDeletedEvent,
  MbscEventUpdatedEvent,
  MbscEventUpdateEvent,
} from '@mobiscroll/angular';

export interface IDispatchedEvent {
  type: DispatchEventType;
  event:
    | MbscEventClickEvent
    | MbscEventCreatedEvent
    | MbscEventCreateEvent
    | MbscEventDeletedEvent
    | MbscEventUpdatedEvent
    | MbscEventUpdateEvent
    | MbscCalendarEvent;
}

export enum DispatchEventType {
  click = 'click',
  created = 'created',
  deleted = 'deleted',
  updated = 'updated',
  create = 'create',
  update = 'update',
  add = 'add',
  edit = 'edit',
  cancel = 'cancel'
}
