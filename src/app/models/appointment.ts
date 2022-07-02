export class Appointment {
  constructor(
    private id: number,
    private title: string,
    private roomId: number,
    private startDate: Date,
    private endDate: Date,
    private userId: number
  ) {}
}
