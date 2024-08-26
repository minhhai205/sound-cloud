import { Express } from "express"
import { homeRoutes } from "./home.route";
import { playlistRoutes } from "./playlist.route";
import { songRoutes } from "./song.route";
import { searchRoutes } from "./search.route";

const route = (app: Express): void => {
  app.use("/", homeRoutes);

  app.use("/playlists", playlistRoutes);

  app.use("/songs", songRoutes);

  app.use("/search", searchRoutes);

}

export default route;