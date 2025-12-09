import express, {Request, Response} from "express";
import path from "path";
import { simpleLog } from "./middlewares/SimpleLog";
import { json } from "stream/consumers";
import { errorResponse } from "./utils/helper";
import { filesRouter } from "./routes/files.routes";
import { directoryRouter } from "./routes/directory.routes";

const app = express();

/**Middlewares */
app.use(express.json());
app.use(simpleLog);
/**Middleware */

/**Routes */
app.use("/files", filesRouter);
app.use("/directory", directoryRouter);

app.listen(5050, ()=> {
    console.log("Server is running on http://localhost:5050");
})