export class Appointment {
  constructor(
    public id: number,
    public title: string,
    public roomId: number,
    public startDate: string,
    public endDate: string,
    public userId: number
  ) {}
}
