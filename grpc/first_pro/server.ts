import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "proto/user.proto");

// load proto
const packageDef = protoLoader.loadSync(PROTO_PATH);

const grpcObject = grpc.loadPackageDefinition(packageDef) ;

const userPackage:any = grpcObject.user;

// implementation 
type UserRequest = {
    id: number;
}

type UserResponse = {
    name: string;
    email: string;
    age: number;
    roles: string[];
}

const listUsers = (call: any) => {
     const users = [
        { name: "Alice", email: "alice@test.com" },
        { name: "Bob", email: "bob@test.com" },
        { name: "Charlie", email: "charlie@test.com" },
    ];

    users.forEach((user)=>{
        call.write(user); //. send one message
    });

    call.end(); //finish stream
}


const getUser = (call: grpc.ServerUnaryCall<UserRequest, UserResponse>, callback: grpc.sendUnaryData<UserResponse>) =>{
    const userId = call.request.id;

    // fake db
    const user = {
        name: "John Doe",
        email: "John@example.com",
        age: 30,
        roles: ["admin", "user"]
    }
    console.log("Request received for ID:", userId);
    callback(null, user);
}

const uploadUsers = (call: any, callback: any)=>{
    const users :any[]= [];

    call.on("data", (user:any)=>{
        console.log("Received:", user);
        users.push(user);
    })

    call.on("end", ()=>{
        callback(null, {
            name: "Uploaded " + users.length + " users",
            email: "done@test.com",
        })
    })
}

const chat = (call: any) => {
    call.on("data", (req: any)=>{
        console.log("Client says:", req);
        call.write({
            name: "Server",
            email: `Echo for ID ${req.id}`
        })
    });
    call.on("end", ()=>{
        call.end();
    });
}

// server setup
const server = new grpc.Server();

server.addService(userPackage.UserService.service, {
    GetUser: getUser,
    ListUsers: listUsers,
    UploadUsers: uploadUsers,
    Chat: chat
});

server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    ()=>{
        console.log("Server is running on port: 50051")
        server.start();
    }
)