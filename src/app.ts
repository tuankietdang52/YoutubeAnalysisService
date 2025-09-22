import dotenv from "dotenv"
dotenv.config();

import ex from "express"
import connectDatabase from "./connection/database-connection";
import routes from "./routes/index";
import cloudinary from "cloudinary"
import * as config from "./config"

config.configure();

const app = ex();
app.use(ex.json());
app.use(routes);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

connectDatabase();

const port = parseInt(process.env.PORT as string) || 3000;
const host = process.env.HOST as string;

app.listen(port, host, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});

export default app;