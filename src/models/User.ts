import { scryptSync, timingSafeEqual } from "crypto";

export type UserDb = {
  id: number;
  login: string;
  password: string;
};

export class User {
  id: number;
  login: string;
  password: string;
  constructor({ id, login, password }: UserDb) {
    this.id = id;
    this.login = login;
    this.password = password;
  }
  isAuthentic(password: string): boolean {
    const [salt, hash] = this.password.split(":");
    const inputPassword = scryptSync(password, salt, 64);
    return timingSafeEqual(inputPassword, Buffer.from(hash, "hex"));
  }
}
