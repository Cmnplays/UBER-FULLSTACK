import "dotenv/config.js";
import app from "./app.js";
import connectToDb from "./db/db.js";
import http from "http";
const port = process.env.PORT;

const server = http.createServer(app);
server.listen(port, async () => {
  console.log("server is running on port ", port);
  await connectToDb();
});
