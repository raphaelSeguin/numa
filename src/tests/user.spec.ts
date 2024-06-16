import assert from "node:assert";
import { describe, it } from "node:test";
import db from "./../db";
import { User, UserDb } from "../models/User";

export class UserRepository {
  constructor() {}
  async findByLogin(login: string): Promise<User> {
    const user = await db.user.findFirstOrThrow({
      where: {
        login,
      },
    });
    return new User(user);
  }
  async create(user: Omit<UserDb, "id">) {
    return db.user.create({ data: user });
  }
  async delete(id: number) {
    return db.user.delete({ where: { id } });
  }
  async getRole() {
    return;
  }
}

describe("User", () => {
  it("Accepts a valid password", async () => {
    const user = await new UserRepository().findByLogin("toto@gmail.com");
    assert.deepEqual(user.isAuthentic("admin1234"), false);
  });
});
