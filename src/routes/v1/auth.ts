import Router from "@koa/router";
import { Context, Next } from "koa";

const router = new Router();
const login = (ctx: Context, next: Next) => {
  ctx.body = "login";
  return next();
};

router.post("/login", login);
router.post("/logout");

router.post("/refresh");

export default router;
