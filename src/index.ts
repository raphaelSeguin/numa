import client from "./db";
import app from "./app";

main();

async function main() {
  app.listen(4444);
  client.$disconnect;
}
