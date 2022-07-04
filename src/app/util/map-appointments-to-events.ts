import { Appointment } from '@core/models';
import { MbscCalendarEvent } from '@mobiscroll/angular';

export const mapAppointmentsToEvents = (appointments: Appointment[]): MbscCalendarEvent[] =>
  appointments.map((appointment) => ({
    start: appointment.startDate,
    end: appointment.endDate,
    id: appointment.id,
    title: appointment.title,
    resource: appointment.roomId,
    organiserId: appointment.userId,
  }));
