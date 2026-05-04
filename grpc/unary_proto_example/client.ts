import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import type { SetItemRequest } from "./type.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, "./item.proto");

const protoDef = protoLoader.loadSync(PROTO_PATH);

const grpcObject = grpc.loadPackageDefinition(protoDef);

const itemPackage:any = grpcObject.item;

// create client
const client = new itemPackage.ItemService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
)

// call remote function
// client.GetItem({ id: 1 }, (err: any, response: any) => {
//   if (err) {
//     console.log("Error:", err);
//     return;
//   }

//   console.log("Response:", response);
// });

// call get all items
// client.GetAllItem({}, (err:any, response:any)=>{
//     if(err){
//         console.log("Error:", err);
//         return;
//     }
//     console.log("Response:", response);
    
// })

// call add new item

// const newItem: SetItemRequest = {
//     title: "Book-1",
//     description: "this is a book",
//     price: 10,
//     discount: 10,
//     isFeatured: false,
//     categories: ["Utility", "Book"]
// }
// client.SetItem(newItem, (err: any, response: any)=> {
//     if(err){
//         console.log("Error:",err);
//         return ;
//     }
//     console.log("Response:", response);
// })

// delete an item
client.deleteItem({id: 2}, (err: any, response: any)=>{
    if(err){
        console.log("Error:", err);
        return;
    }
    console.log("Response:", response);
    
})