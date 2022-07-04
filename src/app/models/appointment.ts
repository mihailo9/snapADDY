export class Appointment {
  constructor(
    public id: number | string,
    public title: string,
    public roomId: number,
    public startDate: string,
    public endDate: string,
    public userId: number
  ) {}
}
