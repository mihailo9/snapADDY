/* eslint-disable arrow-body-style */
import { Appointment } from '@core/models';
import { MbscCalendarEvent } from '@mobiscroll/angular';

export const mapEventToAppointment = (
  event: MbscCalendarEvent
): Appointment => {
  return {
    startDate: event.start as string,
    endDate: event.end as string,
    id: event.id,
    roomId: event.resource as number,
    userId: null,
    title: event.title,
  };
};
