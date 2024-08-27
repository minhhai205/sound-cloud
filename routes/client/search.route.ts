import express, { Router } from "express"
import * as controller from "../../controllers/client/search.controller";
const router: Router = express.Router();

router.get("/", controller.result);

router.get("/songs", controller.songs);

router.get("/playlists", controller.playlists);

router.get("/people", controller.people);

router.get("/albums", controller.albums);

export const searchRoutes: Router = router;