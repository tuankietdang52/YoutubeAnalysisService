import { Router } from "express"
import { analyzeYoutubeVideo } from "../../controller/analyze-controller"

const analyzeRoute = Router();
analyzeRoute.post("/", analyzeYoutubeVideo);

export default analyzeRoute;