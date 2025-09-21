import { Router } from "express"
import analyzeRoute from "./analyze/index";
import transcriptRoute from "./transcript-result";

const routes = Router();
routes.use("/api/analyze", analyzeRoute);
routes.use("/api/transcript", transcriptRoute);

export default routes;