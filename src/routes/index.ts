import Router from "@koa/router";
import v1Router from "./v1/index";

const router = new Router();

router.get("/", (ctx) => {});
router.get("/health", (ctx) => {
  ctx.body = "OK";
});
router.use("/v1", v1Router.routes());

export default router;
