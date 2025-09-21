import { Router } from "express"
import { getResult } from "../../controller/transcript-controller";

const transcriptRoute = Router();
transcriptRoute.get("/result/:id", getResult);

export default transcriptRoute;