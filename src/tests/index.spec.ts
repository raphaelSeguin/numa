import { after, before, describe, test } from "node:test";
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
  describe("Creation flow", () => {
    const user = {
      login: "tester@test.com",
      password: "toto123",
    };
    let userId: number;
    after(async () => {
      await db.user.delete({
        where: {
          login: user.login,
        },
      });
    });
    test("Create a user", async (t) => {
      const request = supertest(app.listen());
      const response = await request.post("/v1/users").send(user);
      userId = response.body.id;
      assert.deepEqual(response.status, 201);
      assert.deepEqual(response.body.login, user.login);
    });
    test("Get created user", async (t) => {
      const request = supertest(app.listen());
      const getUser = await request.get(`/v1/users/${userId}`);
      assert.deepEqual(getUser.body.login, user.login);
    });
    test("Login with created user", async (t) => {
      const request = supertest(app.listen());
      const connexion = await request.post(`/v1/auth/login`).send({
        login: user.login,
        password: user.password,
      });
      assert.deepEqual(connexion.status, 200);
    });
    test("Login with unknown user", async (t) => {
      const request = supertest(app.listen());
      const connexion = await request.post(`/v1/auth/login`).send({
        login: "pirate@space.com",
        password: "WarezMF2000",
      });
      assert.deepEqual(connexion.status, 403);
    });
  });
  test.skip("Modify a user", async (t) => {
    const request = supertest(app.listen());
    const response = await request.post("/v1/users/1").send({
      name: "kiki",
    });
    assert.deepEqual(response.status, 200);
  });
});
