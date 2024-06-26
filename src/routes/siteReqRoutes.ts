import Router from "express";
import * as dotenv from "dotenv";

import { Permissions } from "../middlewares/authorization";
import { siteRequest } from "../controllers/siteRequest";

const siteController = new siteRequest();
dotenv.config();

export const siteRoutes = Router();

siteRoutes.post("/request-site", siteController.createSiteRequest);
