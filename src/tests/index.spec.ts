import { after, before, describe, it, test } from "node:test";
import assert, { doesNotMatch } from "node:assert";
import supertest from "supertest";
import { config } from "dotenv";
import app from "../app";
import db from "../db";

import "./user.spec";

config();
const request = supertest(app.listen());

describe("Test health api", () => {
  it("get /health responds OK", async (t) => {
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
    it("Create a user", async (t) => {
      const response = await request.post("/v1/users").send(user);
      userId = response.body.id;
      assert.deepEqual(response.status, 201);
      assert.deepEqual(response.body.login, user.login);
    });
    it("Get created user", async (t) => {
      const getUser = await request.get(`/v1/users/${userId}`);
      assert.deepEqual(getUser.body.login, user.login);
    });
    it("Login with created user", async (t) => {
      const connexion = await request.post(`/v1/auth/login`).send({
        login: user.login,
        password: user.password,
      });
      assert.deepEqual(connexion.status, 200);
    });
    it("Login with unknown user", async (t) => {
      const connexion = await request.post(`/v1/auth/login`).send({
        login: "pirate@space.com",
        password: "WarezMF2000",
      });
      assert.deepEqual(connexion.status, 403);
    });
    it("Successful login get jwt authorization header", async (t) => {
      const connexion = await request.post(`/v1/auth/login`).send({
        login: user.login,
        password: user.password,
      });
      console.log(connexion.headers);
      assert(connexion.headers.authorization !== undefined);
    });
  });
  it.skip("Modify a user", async (t) => {
    const response = await request.post("/v1/users/1").send({
      name: "kiki",
    });
    assert.deepEqual(response.status, 200);
  });
});
