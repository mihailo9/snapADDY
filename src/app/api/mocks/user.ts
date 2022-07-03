class User {
  constructor(private id: number, private name: string) {}
}

export const users: User[] = [
  new User(1, 'Sebastian'),
  new User(2, 'Bene'),
  new User(3, 'Mihailo'),
];
