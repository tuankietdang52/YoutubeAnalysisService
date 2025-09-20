import { Router } from "express"
import analyzeRoute from "./analyze/index";

const routes = Router();
routes.use("/api/analyze", analyzeRoute);

export default routes;