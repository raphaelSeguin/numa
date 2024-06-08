import { before, describe, test } from "node:test";
import assert, { doesNotMatch } from "node:assert";
import supertest from "supertest";

import app from "../app";
import db from "../db";

describe("Test health api", () => {
  test("get /health responds OK", async (t) => {
    const server = app.listen();
    const request = supertest(server);
    const response = await request.get("/health");
    assert.deepEqual(response.text, "OK");
  });
});

describe("Users api", () => {
  before(async () => {
    await db.user.delete({
      where: {
        email: "testtest@test.com",
      },
    });
  });
  test("Create a user and get it", async (t) => {
    const user = {
      email: "testtest@test.com",
      password: "toto123",
    };
    const request = supertest(app.listen());
    const response = await request.post("/v1/users").send(user);

    assert.deepEqual(response.status, 201);
    assert.deepEqual(response.body.email, user.email);

    const getUser = await request.get(`/v1/users/${response.body.id}`);
    assert.deepEqual(getUser.body.email, user.email);
  });
  test.skip("Modify a user", async (t) => {
    const request = supertest(app.listen());
    const response = await request.post("/v1/users/1").send({
      name: "kiki",
    });
    assert.deepEqual(response.status, 200);
  });
});
