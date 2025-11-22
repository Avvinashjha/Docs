import express from "express";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import { testConnection } from "./configs/database.js";

const app = express();

const PORT = 5050;

app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter)

testConnection();

// Handle non existing path
app.use( (req, res)=>{
    res.status(404).json({
        message: "Resource not found"
    })
})

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})