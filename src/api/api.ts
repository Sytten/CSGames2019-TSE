import { Router } from 'express';

import * as statusController from "./status";
import * as authController from "./authentication";

export class Api {
    public getRouter(): Router {
        const router = Router();
        router.get("/status", statusController.getStatus);
        router.post("/auth/createAccount", authController.createAccount)
        return router;
    }
}
