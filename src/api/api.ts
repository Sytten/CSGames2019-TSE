import { Router } from "express";

import authenticationMiddleware from "../middlewares/authentification"
import * as statusController from "./status";
import * as authController from "./authentication";
import * as articleController from "./article";

export class Api {
  public getRouter(): Router {
    const router = Router();
    router.get("/status", statusController.getStatus);
    router.post("/auth/createAccount", authController.createAccount);
    router.post("/auth/authenticate", authController.authenticate);
    router.get("/articles", articleController.getAll);
    router.get("/article/:ARTICLE_ID", articleController.get);
    router.get("/articles/user/:USER_ID", articleController.getForUser);

    // Authenticated paths
    router.use(authenticationMiddleware);
    router.get("/auth/userid", authController.getUserID);
    router.post("/articles", articleController.create);
    return router;
  }
}
