import express, { Router } from "express"
import * as controller from "../../controllers/client/auth.controller";
import * as validate from "../../validates/client/auth.validate";

const router: Router = express.Router();

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

export const authRoutes: Router = router;