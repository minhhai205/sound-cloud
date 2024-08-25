import express, { Router } from "express"
import * as controller from "../../controllers/client/playlist.controller";
const router: Router = express.Router();

router.get("/:slugPlaylist", controller.detail);

export const playlistRoutes: Router = router;