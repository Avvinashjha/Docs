import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import path from "path";
import type {
  Empty,
  GetItemRequest,
  Item,
  ItemList,
  SetItemRequest,
  SuccessResponse,
  UpdateItemRequest,
} from "./type.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// step1: Define proto path

const PROTO_PATH = path.join(__dirname, "./item.proto");

// step 2: Load proto definition

const protoDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// step 3: Create item proto object

const grpcObject = grpc.loadPackageDefinition(protoDef);

// step 4: get item package

const itemPackage: any = grpcObject.item;

// In Memory DB
let items: Item[] = [
  {
    id: 1,
    title: "Laptop",
    description: "Gaming laptop",
    price: 1200,
    discount: 100,
    isFeatured: true,
    categories: ["electronics"],
  },
];

// define get item logic
const getItem = (
  call: grpc.ServerUnaryCall<GetItemRequest, Item>,
  callback: grpc.sendUnaryData<Item>,
) => {
  const itemId = call.request.id;
  const found = items.find((i) => i.id === itemId);

  if (!found) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Item not found",
    });
  }

  callback(null, found);
};

const getAllItems = (
  call: grpc.ServerUnaryCall<Empty, ItemList>,
  callback: grpc.sendUnaryData<ItemList>,
) => {
  const itemList: ItemList = {
    items: items,
  };
  return callback(null, itemList);
};

const setItem = (
  call: grpc.ServerUnaryCall<SetItemRequest, Item>,
  callback: grpc.sendUnaryData<Item>,
) => {
  const id = items.length + 1;
  const newItem: Item = {
    id: id,
    ...call.request,
  };
  items.push(newItem);

  callback(null, newItem);
};

const deleteItem = (
  call: grpc.ServerUnaryCall<GetItemRequest, SuccessResponse>,
  callback: grpc.sendUnaryData<SuccessResponse>,
) => {
  const itemId = call.request.id;
  const found = items.find((i) => i.id === itemId);
  if (!found) {
    return callback({
        code: grpc.status.NOT_FOUND,
        message: "Item Not Found"
    });
  }
  items = items.filter((i) => i.id !== itemId);
  callback(null, {
    success: true,
    message: "Deleted the item",
  });
};

const updateItem = (
  call: grpc.ServerUnaryCall<UpdateItemRequest, SuccessResponse>,
  callback: grpc.sendUnaryData<SuccessResponse>,
) => {
  const itemId = call.request.id;
  const index = items.findIndex((i) => i.id === itemId);

  if (index === -1) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Item not found",
    });
  }

  items[index] = {
    ...items[index],
    ...call.request,
  };

  callback(null, {
    success: true,
    message: "Item updated successfully",
  });
};

// server setup
const server = new grpc.Server();

// add service to server
server.addService(itemPackage.ItemService.service, {
  GetItem: getItem,
  GetAllItem: getAllItems,
  SetItem: setItem,
  DeleteItem: deleteItem,
  UpdateItem: updateItem,
});

// bind server to port, define credential and callback
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(PROTO_PATH);

    console.log(`Server is running on port: localhost:50051`);
    server.start();
  },
);
