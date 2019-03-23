import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as utils from "../utils";

export default (req: Request, res: Response, next: NextFunction) => {
  // Missing token
  if (!req.headers["authorization"]) {
    res.status(403).send();
    return;
  }

  // Not a bearer
  const token: string = req.headers["authorization"].toString().replace("Bearer ", "");
  if (!token) {
    res.status(403).send();
    return;
  }

  try {
    // Verify signature
    if (!jwt.verify(token, utils.getJwtSecret())) {
      res.status(403).send();
      return;
    }

    // Store claims
    res.locals.user = jwt.decode(token);
  } catch {
    res.status(403).send();
    return;
  }

  next();
};
