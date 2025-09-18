import ex from "express"
import dotenv from "dotenv"
import routes from "./routes.js";

dotenv.config();

const app = ex();
app.use(ex.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});