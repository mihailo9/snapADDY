import * as day from 'dayjs';

class Appointment {
  constructor(
    private id: number,
    private title: string,
    private roomId: number,
    private startDate: string,
    private endDate: string,
    private userId: number
  ) {}
}

export const appointments = [
  new Appointment(
    1,
    'Meeting 1',
    1,
    '2022-07-04T10:30:00.000Z',
    '2022-07-04T11:30:00.000Z',
    3
  ),
  new Appointment(
    2,
    'Meeting 2',
    3,
    '2022-07-06T12:30:00.000Z',
    '2022-07-06T13:30:00.000Z',
    2
  ),
  new Appointment(
    3,
    'Meeting 3',
    2,
    '2022-07-05T15:30:00.000Z',
    '2022-07-05T17:30:00.000Z',
    1
  ),
];
