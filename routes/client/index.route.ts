import { Express } from "express"
import { homeRoutes } from "./home.route";
import { playlistRoutes } from "./playlist.route";

const route = (app: Express): void => {
  app.use("/", homeRoutes);

  app.use("/playlists", playlistRoutes);

}

export default route;