import Router from "@koa/router";
import v1Router from "./v1/index";
import { Context, Next } from "koa";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";

const router = new Router();

router.get("/", (ctx: Context, next: Next) => {
  ctx.response.set("Content-Type", "text/html; charset=utf-8");
  ctx.response.body = readFileSync(
    path.join(__dirname, "..", "static", "index.html")
  );
});
router.get("/welcome", (ctx: Context, next: Next) => {
  ctx.response.set("Content-Type", "text/html; charset=utf-8");
  ctx.response.body = readFileSync(
    path.join(__dirname, "..", "static", "welcome.html")
  );
});
router.get("/favicon.ico", (ctx: Context, next: Next) => {
  ctx.response.body = readFileSync(
    path.join(__dirname, "..", "static", "favicon.ico")
  );
});
router.get("/health", (ctx) => {
  ctx.body = "OK";
});
router.use("/v1", v1Router.routes());

export default router;
