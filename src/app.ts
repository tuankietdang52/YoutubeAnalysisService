import dotenv from "dotenv"
dotenv.config();

import ex from "express"
import connectDatabase from "./connection/database-connection";
import routes from "./routes/index";

const app = ex();
app.use(ex.json());
app.use(routes);

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});
