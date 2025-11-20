import express from "express";
import userRoutes from "./routes/user.routes.js";
import dataRoutes from "./routes/data.routes.js";
const app = express();

app.use(express.json());
// Routes
app.use("/users", userRoutes);
app.use("/data", dataRoutes);

app.listen(5050, ()=>{
    console.log("http://localhost:5050");
})