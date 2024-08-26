import express, { Router } from "express"
import * as controller from "../../controllers/client/search.controller";
const router: Router = express.Router();

router.get("/", controller.result);

export const searchRoutes: Router = router;