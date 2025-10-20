import {createServer} from "node:http";

const server = createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "Text/plain"});
    res.end("Hello Node!\n");
})


// Start the server on port 5000
server.listen(3000, "127.0.0.1", ()=> {
    console.log("Listening to http://127.0.0.1:3000");
})