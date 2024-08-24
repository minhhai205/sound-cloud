import express, { Express, Request, Response } from "express";
import env from "dotenv" 
env.config();

import route from "./routes/client/index.route";

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});