import express, {Request, Response} from "express";
import helloRoutes from "./routes/hello";
import userRoutes from "./routes/users";
import todoRoutes from "./routes/todos";
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;


// Middle ware
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Routes
app.use("/hello", helloRoutes);
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req: Request, res: Response)=> {
    res.json({message: "Hello From base of my app"})
})

/* this is will not be handled by index.ts
app.get("/hello", (req: Request, res: Response)=> {
    res.send({message: "Hi"})
})
*/

app.get("/health", (req: Request,res: Response)=>{
    res.json({
        status: "OK",
        timeStamp: Date.now()
    })
})

app.listen(PORT, ()=> {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})

export default app;