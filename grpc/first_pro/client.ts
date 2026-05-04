import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "proto/user.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);

const userPackage:any = grpcObject.user;

// create client
const client = new userPackage.UserService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// const stream = client.ListUsers({});

// stream.on("data", (user: any)=>{
//     console.log("User:", user);
// });

// stream.on("end", ()=>{
//     console.log("Stream Ended");
// })

// call remote function
// client.GetUser({id: 1}, (err: any, response: any)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("user:", response);
// })

// const stream = client.UploadUsers((err: any, response: any)=>{
//     console.log("Server response: ", response);
// });

// stream.write({id: 1});
// stream.write({id: 2});
// stream.write({id: 3});
// stream.end();

const stream = client.Chat();

stream.on("data", (res: any)=>{
    console.log("Server:", res);
});

stream.write({id: 1});
stream.write({id: 2});
setTimeout(()=>{
    stream.end();
}, 2000);