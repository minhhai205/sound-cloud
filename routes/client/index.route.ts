import { Express } from "express"
import { homeRoutes } from "./home.route";
import { playlistRoutes } from "./playlist.route";
import { songRoutes } from "./song.route";
import { searchRoutes } from "./search.route";
import { authRoutes } from "./auth.route";

const route = (app: Express): void => {
  app.use("/", homeRoutes);

  app.use("/playlists", playlistRoutes);

  app.use("/songs", songRoutes);

  app.use("/search", searchRoutes);

  app.use("/auth", authRoutes);

}

export default route;