interface IUser {
  login: string;
  password: string;
}

class User {
  constructor(
    private readonly login: string,
    private readonly password: string
  ) {}
}
