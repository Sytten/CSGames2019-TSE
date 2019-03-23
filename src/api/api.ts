import { Router } from 'express';

import * as statusController from "./status";

export class Api {
    public getRouter(): Router {
        const router = Router();
        router.get("/status", statusController.getStatus);
        return router;
    }
}
