import { Appointment } from '@core/models';
import { MbscCalendarEvent } from '@mobiscroll/angular';

export const mapAppointmentsToEvents = (
  appointments: Appointment[]
): MbscCalendarEvent[] =>
  appointments.map((appointment) => ({
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    id: appointment.id,
    title: appointment.title,
    resource: appointment.roomId,
    organiserId: appointment.userId,
  }));
