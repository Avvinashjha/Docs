import http from "http";
import { getMethodHandler, getResponse, data, readJsonBody, postMethodHandler } from "./utils/helper.js";
import { getService } from "./services/getService.js";
import { postService } from "./services/postService.js";
import { putService } from "./services/putService.js";
import { deleteService } from "./services/deleteService.js";

const server = http.createServer(async (req, res)=>{
    const method = req.method;
    const url = req.url;
    if(method === "GET"){
        getService(req, res, url);
    }else if(method === "POST"){
        postService(res, res, url);
    }else if(method === "PUT"){
         putService(req, res, url);
    }else if(method === "DELETE"){
        deleteService(req, res, url);
    }else{
        res.end("Method is not supported.");
    }
})

server.listen(5050, "localhost", ()=>{
    console.log("http://localhost:5050");
})