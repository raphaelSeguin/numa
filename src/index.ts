import { config } from "dotenv";
import client from "./db";
import app from "./app";

main();

async function main() {
  config();
  app.listen(4444);
  client.$disconnect;
}
