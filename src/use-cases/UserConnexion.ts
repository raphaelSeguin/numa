import { User } from "../models/User";
import { UserRepository } from "../tests/user.spec";
import { AuthenticationError } from "../models/AuthenticationError";

export class AuthenticationUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async process(login: string, password: string) {
    let user: User;
    try {
      user = await this.userRepository.findByLogin(login);
    } catch {
      throw new AuthenticationError();
    }
    if (!user.isAuthentic(password)) {
      throw new AuthenticationError();
    }

    // const role = await user.getRole();
  }
}
