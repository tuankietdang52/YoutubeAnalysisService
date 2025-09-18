import { Router } from "express"
import { analyzing } from "./controller/analyze-controller.js"

const routes = Router();
routes.post("/api/analyze", analyzing);

export default routes;