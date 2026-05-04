# Roadmap

## What is gRPC?
- Remote Procedure calls (RPC): call function on another server
- Uses Protocol Buffers (Protobuf) instead of JSON
- Runs over HTTP/2 (multiplexing, streaming, low latency)

Core idea: gRPC lets you call a function on another machine as if it were local.

## Difference between REST and gRPC
- REST : endpoint + JSON
- gRPC: service + methods + strong typed contracts

REST Mindset:

```http
GET /users/123
```

You:
- think in URLs
- send JSON
- manually parse response

gRPC Mindset

```ts
userService.getUser({id: 123})
```

You:
- think in function
- send typed objects
- don't deal with raw HTTP

## The Heart of gRPC: `.proto` files

Everything start here.

A `.proto` file is: A contract that defines what function exits and what data they use.

Example:

```proto
syntax = "proto3"

service UserService{
    rpc GetUser (UserRequest) returns (UserResponse)
}

message UserRequest {
    int32 id = 1
}

message UserResponse {
    string name = 1;
    string email = 2;
}
```

### What this actually means

You just defined:

1. A service (like a class)
   
   ```
    UserService
   ```

2. A method (like a function)
   
   ```
    GetUser(request) -> response
   ```

3. Data structures (like types/interface)
   
   ```
    UserRequest
    UserResponse
   ```

That .proto file becomes:

- Typescript types
- Go Structs
- Java Classes

Automatically, this is why gRPC works across languages.

### What happens under the hood

When you call:

```ts
client.getUser({id: 123})
```

gRPC:
1. Serializes data -> binary(Protobuf)
2. Send over HTTP/2
3. Server executes function
4. Returns response (also binary)
5. Client deserializes it

You don't see any of this.

Thinks of gRPC as, a Strongly-typed function call over the network, powered by a shared contract.


## Types of RPC
- Unary: request -> response
- Server Streaming: one request -> Many response
- Client Streaming: many request -> one response
- Bidirectional streaming: both directions continuously

## Create your first gRPC App

Goal: make a minimal working system.

### What to build

A simple User service:

- GetUser(id)
- CreateUser(name, email)

### What you will learn
- Writing `.proto`
- Generating service definition
- Running a gRPC server
- calling it from a client

### Key Concept here

- `.proto` = your API contract
- Messages = request/response types
- Services = functions exposed remotely

### user.proto

- Don't miss `;` in .proto else you will get errors
- each proto is a package 
- each proto has a service 
- each proto has a request method 
- each proto has a response method
- and in service we write what will be the response and request

```proto
syntax = "proto3";

// we are defining package
package user;

service UserService{
    rpc GetUser(userRequest) returns (UserResponse)
}

// request type
message UserRequest {
    int32 id = 1
}

// response type
message UserResponse {
    string name = 1;
    string email = 2; // the number defines the order in which you will get the response
}
```

### server.ts

```ts
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/grpc-loader";
import path from "path";

// In es-module you can not directly use __dirname
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define the path of your proto
const PROTO_PATH = path.join(__dirname, "proto/user.proto");

// load user proto package
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);

const userPackage:any = grpcObject.user;

// implementation

const getUser = (call: any, callback: any) => {
    const userId = call.request.id;
    //in memory db
     // fake database
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  console.log("Request received for ID:", userId);

  callback(null, user);
}

// server setup
const server = new grpc.Server();

server.addService(userPackage.UserService.service, {
    GetUser: getUser,
});

server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    ()=> {
        console.log("Server running on port 50051");
        server.start();
    }
)
```

### Client.ts

```ts
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "proto/user.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const userPackage = grpcObject.user;

// create client
const client = new userPackage.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// call the remote function
client.GetUser({ id: 1 }, (err: any, response: any) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("User:", response);
});
```



## Deep Fundamentals

### Learn Protobuf properly
- Scalar types (string, int32, etc)
- Nested messages
- Enums
- Repeated fields (arrays)
- Field numbering (very important for versioning)
- Validation logic
- Error handling (status codes)
- Logging

#### 1. Understanding Protobuf property

You current message:

```prot0
message UserResponse{
    string name = 1;
    string email = 2;
}
```

These numbers are not random

```
name = 1
email = 2
```

These are **fields identifiers used in binary encoding**.

Rules
- Never change existing numbers (response order will change)
- Never reuse a number (Error: duplicate id 2 in Type UserResponse)
- Only add new fields with new number

Why?

Because gRPC sends binary, not JSON.

Old client:

```JSON
{"name" : "John"}
```

New Server adds:
```
int32 age=3
```

Old client still work. That's backward compatibility.

#### 2. Improve your schema
Let's upgrade your `.proto` a bit.

```proto
syntax = "proto3";

package user;

service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest{
    int32 id = 1;
}

message UserResponse {
    string name = 1;
    string email= 2;
    int32 age = 3;
    repeated string roles = 4;
}
```

`repeated` is used when you want to return an array in response.

```proto
repeated string roles = 4;
```

means roles will be send as array of string.

Default values (proto3 behavior)
- string - ""
- int - 0
- array - []

Not null like JSON

#### 3. Fix type safety

Right now we have,

```js
const getUser = (call: any, callback: any) =>{
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

```

Define minimal types manually:

```ts
type UserRequest = {
    id: number;
}
type UserResponse = {
    name: string;
    email: string;
    age: number;
    roles: string[];
}
```

Update server:

```ts
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
```

Why this matters:
- autocomplete works
- type errors show early
- your contract is cleaner

#### How data actually travels
This matters for debugging later:

When you send:

```
{id : 1}
```

It becomes something like:

```
[field:1][value:1]
```
Binary encoded.

That's why: 
- it's faster than JSON
- small payload
- stricter structure

#### type does not matter only .proto matters

If you remove anything from response then if your type has that or not it does not matter client will get response base on your .proto.

## Streaming(this is where gRPC shines)

### 1. Server streaming

Example:
- ListUsers() -> return stream of users

### 2. Client streaming

Example:

- Upload multiple records -> server responds once

### 3. Bidirectional Streaming

Example:

- Realtime chat (message both ways)

This phase is what separates "basic" from real gRPC usage.

