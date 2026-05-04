import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../proto/chat.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);

const chatPackage = grpcObject.chat as any;

const clients: any[] = [];

const authInterceptor = (options: any, nextCall: any) => {
    return new grpc.InterceptingCall(nextCall(options), {
        start: (metadata:any, listener:any, next: any) =>{
            const token = metadata.get("authorization")[0];
            if(token !== "Bearer xyz"){
                listener.onReceiveStatus({
                    code: grpc.status.UNAUTHENTICATED,
                    details: "Invalid token"
                })
                return;
            }
            next(metadata, listener);
        },
    });
};

const chatStream = (call: any) => {
    clients.push(call);

    call.on("data", (msg: any) => {
        console.log(`${msg.user}: ${msg.message}`);
        // broadcast to all clients
        clients.forEach((client)=>{
            client.write({
                user: msg.user,
                message: msg.message,
            });
        });
    });

    call.on("end", ()=>{
        console.log("Client disconnected");
        
        const index = clients.indexOf(call);
        if(index !== -1) clients.splice(index, 1);
        call.end();
    });
};

const server = new grpc.Server();

server.addService(chatPackage.ChatService.service, {
    ChatStream: chatStream
})

server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    ()=>{
        console.log("Chat server running...");
        server.start();
    }
);