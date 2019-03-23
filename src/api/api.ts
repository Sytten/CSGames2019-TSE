import { Router } from "express";

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
    return router;
  }
}
