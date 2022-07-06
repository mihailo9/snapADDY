export class Appointment {
  constructor(
    public id: number | string,
    public title: string,
    public roomId: number,
    public startDate: string | Date,
    public endDate: string | Date,
    public userId: number
  ) {}
}
