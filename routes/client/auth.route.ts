import express, { Router } from "express"
import * as controller from "../../controllers/client/auth.controller";
const router: Router = express.Router();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

export const authRoutes: Router = router;