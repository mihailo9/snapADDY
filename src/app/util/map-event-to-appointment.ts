import { Appointment } from '@core/models';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import * as day from 'dayjs';

export const mapEventToAppointment = (
  event: MbscCalendarEvent
): Appointment => {
  console.log(event);

  return {
    startDate: day(event.start as string).toISOString(),
    endDate: day(event.end as string).toISOString(),
    id: event.id,
    roomId: event.resource as number,
    userId: null,
    title: event.title,
  };
};
