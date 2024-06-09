import Router from "@koa/router";
import { Context, Next } from "koa";
import db from "../../db";
import { scrypt, scryptSync, timingSafeEqual } from "crypto";

const router = new Router();

const login = async (ctx: Context, next: Next) => {
  const { login, password } = ctx.request.body;
  if (!login || !password) {
    return (ctx.status = 400);
  }
  const user = await db.user.findUnique({
    where: {
      login: login,
    },
  });
  if (!user) {
    return (ctx.response.status = 403);
  }
  const [salt, hash] = user?.password.split(":");
  const inputPassword = scryptSync(password, salt, 64);
  if (timingSafeEqual(inputPassword, Buffer.from(hash, "hex"))) {
    console.log(`User ${user.id} connected`);
    ctx.response.status = 200;
    return (ctx.body = {
      connected: true,
    });
  }
  ctx.status = 403;
  return next();
};

router.post("/login", login);
router.post("/logout");

router.post("/refresh");

export default router;
