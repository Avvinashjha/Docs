const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const WebSocketServer = new WebSocket.Server({server});

const users = {}; // userId => webSocket
const rooms = {}; // roomName => [userIds]

function broadcastToRoom(room, message){
    if(!rooms[room]) return;
    rooms[room].forEach((userId) => {
        if(users[userId] && users[userId].readState === WebSocket.OPEN){
            users[userId].send(JSON.stringify(message));
        }
    });
}

WebSocketServer.on("connection", (ws) => {
    let userId = null;
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        // Register user
        if(data.type === "register"){
            userId = data.userId;
            users[userId] = ws;
            ws.send(JSON.stringify({type: "info", message: "Registered successfully"}));
        }

        // Join Room
        if(data.type === "join"){
            if(!rooms[data.room]) rooms[data.room] = [];
            if(!rooms[data.room].includes(userId)) rooms[data.room].push(userId);
            broadcastToRoom(data.room, {type: 'info', message: `${userId} joined ${data.room}`});
        }

        // send message (1-to-1 or group)
        if(data.type === "message"){
            const messagePayload = {
                type: "message",
                from: userId,
                text: data.text
            }

            if(data.to){
                // 1-to-1
                if(users[data.to]){
                    users[data.to].send(JSON.stringify(messagePayload));
                }
            } else if (data.room){
                // Many-to-many
                broadcastToRoom(data.room, messagePayload);
            }
        }
    })
    ws.on("close", ()=> {
    if(userId && users[userId]) delete users[userId];
    for(const room in rooms){
        rooms[room] = rooms[room].filter((id) => id !== userId);
    }
})
});

server.listen(5050, ()=>{
    console.log("Web Socket server is running on ws://localhost:5050");
    
})

