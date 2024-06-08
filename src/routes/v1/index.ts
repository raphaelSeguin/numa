import Router from "@koa/router";
import userRouter from "./users";
import authRouter from "./auth";

const router = new Router();

router.use("/users", userRouter.routes());
router.use("/auth", authRouter.routes());

export default router;
