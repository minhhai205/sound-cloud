import express, { Express, Request, Response } from "express";
import env from "dotenv" 
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import methodOverride from "method-override"
import flash from "express-flash"
import session from "express-session"
env.config();

import * as database from "./config/database";
import route from "./routes/client/index.route";

database.connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.use(bodyParser.urlencoded({ extended:  false })); // parse application/x-www-form-urlencoded
app.use(methodOverride('_method'));

app.use(cookieParser("JHKSHFKJSDHF"));
app.use(session({ secret: 'B1@K!jNz3#1L4G7f^9pQ8dR&xWZ', cookie: { maxAge: 60000 }}));
app.use(flash());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});