interface IUser {
  email: string;
}

class User {
  constructor(
    private readonly email: string,
    private readonly password: string
  ) {}
}
