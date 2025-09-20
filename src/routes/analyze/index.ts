import { Router } from "express"
import { analyzing } from "../../controller/analyze-controller"

const analyzeRoute = Router();
analyzeRoute.post("/", analyzing);

export default analyzeRoute;