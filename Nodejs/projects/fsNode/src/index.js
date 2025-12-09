import express from "express";
import { simpleLog, timeLog } from "./middlewares/test.js";
import { fileRouter } from "./routes/file.route.js";
import { directoryRouter } from "./routes/directory.route.js";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
const PORT = 5050;
// Create a express app
const app = express();

/**
 * middlewares
 */
app.use(simpleLog);
app.use(timeLog);
app.use(express.json())

/**routes */
app.use("/files", fileRouter);
app.use("/directories", directoryRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);


app.get("/", (req, res)=>{
    res.json({message: "Hello from Main App"})
})

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:5050");
    
})