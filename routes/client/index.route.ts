import { Express } from "express"
import { homeRoutes } from "./home.route";

const route = (app: Express): void => {
  app.use("/", homeRoutes)
}

export default route;