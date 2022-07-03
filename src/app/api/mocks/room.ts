class Room {
  constructor(
    private id: number,
    private name: string,
    private numberOfPeople: number
  ) {}
}

export const rooms: Room[] = [
  new Room(1, 'Room A', 6),
  new Room(2, 'Room B', 3),
  new Room(3, 'Room C', 7),
];
