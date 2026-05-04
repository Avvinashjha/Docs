import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import readline from "readline";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../proto/chat.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);

const chatPackage = grpcObject.chat as any;

const client = new chatPackage.ChatService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// send auth token
const metadata = new grpc.Metadata();
metadata.add("authorization", "Bearer xyz");

const stream = client.ChatStream(metadata);

//listen for message
stream.on("data", (msg: any)=>{
    console.log(`${msg.user}: ${msg.message}`);
})

// CLI Input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const userName = "User" + Math.floor(Math.random()*1000);

rl.on("line", (input)=>{
    stream.write({
        user: userName,
        message: input
    })
});