import express, { Express, Request, Response } from "express";
import env from "dotenv" 
env.config();

import * as database from "./config/database";
import route from "./routes/client/index.route";

database.connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});