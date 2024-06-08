import type { Context, Next } from "koa";

export async function logger(ctx: Context, next: Next): Promise<void> {
  console.time(ctx.url);
  await next();
  console.log(ctx);
  console.timeEnd(ctx.url);
}
