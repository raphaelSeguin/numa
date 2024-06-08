import Koa from "koa";
import router from "./routes/index";
import { logger } from "./middleware";
import { bodyParser } from "@koa/bodyparser";
import { nodeEnv } from "./config";

const app = new Koa();

if (nodeEnv !== "test") {
  app.use(logger);
}
app.use(bodyParser());
app.use(router.routes());

export default app;
