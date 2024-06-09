import Router from "@koa/router";
import type { Context, Next } from "koa";
import db from "../../db";
import { randomBytes, randomFill, scrypt, scryptSync } from "node:crypto";

const userRouter = new Router();

userRouter.get("/", async (ctx: Context, next: Next) => {
  const users = await db.user.findMany();
  ctx.body = users;
  return next();
});

userRouter.get("/:id", async (ctx: Context, next: Next) => {
  const { id } = ctx.params;
  const user = await db.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  ctx.body = user;
  return next();
});

userRouter.post("/", async (ctx: Context, next: Next) => {
  const user = ctx.request.body;
  const login = user.login;
  const salt = randomBytes(64).toString("hex");
  const hash = scryptSync(user.password, salt, 64).toString("hex");
  const created = await db.user.create({
    data: {
      login,
      password: `${salt}:${hash}`,
    },
  });
  ctx.response.status = 201;
  ctx.body = created;
});

userRouter.post("/:id", (ctx: Context, next: Next) => {
  ctx.body = "update user";
});

userRouter.delete("/:id", (ctx: Context, next: Next) => {
  ctx.body = "delete user";
});

export default userRouter;
