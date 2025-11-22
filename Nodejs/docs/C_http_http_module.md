# Node.js HTTP Module

HTTP module is build in with node js and it allow us to create server and listen to request and send back the response.

Features of HTTP Module:

- Create a server and handle req/res
- Make http request to other services
- Handle different http methods (GET/POST/PUT/DELETE..)
- Handle Data Streaming


## 1. Let's Build First Server

1. Create a server
2. Expose a port on which your server will listen
3. return a response to client when they request to your server

```js
const http = require("http");

const port = 5050;

const server = http.createServer((req, res)=>{
    res.end("Hello from node")
})

server.listen(port, ()=>{
    console.log("http://localhost:5050")
})
```

Explanation: 

- createServer: http module has a method `createServer()` which create a server and this server listen to the `port` specified and executes the callback `(req, res)` function.
- req: the request is the first parameter in callback function which contains the incoming request information. and it is of type `http.IncomingMessage`
- res: the response object is the  response information we will send to client, and it is of type `http.ServerResponse`

## 2. What is http header?

HTTP headers allows you to send additional information with your response.

- To send anything in header res object has a method `writeHead().`

```js
const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        "content-type": "text/html",
        "X-backend": "Node",
        "set-cookie": "name=node; HttpOnly",
        "cache-control": "no-cache, no-store, must-revalidate"
    })
    res.end("Hello from node")
})
```

## 3. Common HTTP status codes

| Code    | Name                   | Category      | Meaning                                                    |
| ------- | ---------------------- | ------------- | ---------------------------------------------------------- |
| **100** | Continue               | Informational | Request received; continue sending the request body.       |
| **101** | Switching Protocols    | Informational | Server agrees to switch protocols (e.g., to WebSocket).    |
| **200** | OK                     | Success       | Request succeeded.                                         |
| **201** | Created                | Success       | Resource successfully created.                             |
| **202** | Accepted               | Success       | Request accepted for processing, but not completed.        |
| **204** | No Content             | Success       | Request succeeded; no response body.                       |
| **301** | Moved Permanently      | Redirect      | Resource permanently moved to a new URL.                   |
| **302** | Found                  | Redirect      | Temporary redirect to another URL.                         |
| **304** | Not Modified           | Redirect      | Resource not modified; use cached version.                 |
| **307** | Temporary Redirect     | Redirect      | Use another URL temporarily; method must remain unchanged. |
| **308** | Permanent Redirect     | Redirect      | Permanent redirect; method must remain unchanged.          |
| **400** | Bad Request            | Client Error  | Malformed request; server can’t process it.                |
| **401** | Unauthorized           | Client Error  | Authentication required.                                   |
| **403** | Forbidden              | Client Error  | Server refuses the request.                                |
| **404** | Not Found              | Client Error  | Resource not found.                                        |
| **405** | Method Not Allowed     | Client Error  | HTTP method not permitted for this resource.               |
| **408** | Request Timeout        | Client Error  | Server timed out waiting for the request.                  |
| **409** | Conflict               | Client Error  | Request conflicts with current state of the server.        |
| **410** | Gone                   | Client Error  | Resource permanently gone.                                 |
| **413** | Payload Too Large      | Client Error  | Request body is too large.                                 |
| **415** | Unsupported Media Type | Client Error  | Server refuses the media format.                           |
| **429** | Too Many Requests      | Client Error  | Rate limit exceeded.                                       |
| **500** | Internal Server Error  | Server Error  | Generic server failure.                                    |
| **501** | Not Implemented        | Server Error  | Server doesn’t support this request method.                |
| **502** | Bad Gateway            | Server Error  | Invalid response from upstream server.                     |
| **503** | Service Unavailable    | Server Error  | Server overloaded or under maintenance.                    |
| **504** | Gateway Timeout        | Server Error  | Upstream server took too long to respond.                  |

## 4. Common Response Headers

| Header                               | Purpose / Meaning                                                        | Example                                                          |
| ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Content-Type**                     | Indicates the MIME type of the response body.                            | `Content-Type: application/json`                                 |
| **Content-Length**                   | Size of the response body in bytes.                                      | `Content-Length: 348`                                            |
| **Content-Encoding**                 | Compression used on the response body.                                   | `Content-Encoding: gzip`                                         |
| **Content-Language**                 | Language of the returned content.                                        | `Content-Language: en-US`                                        |
| **Content-Disposition**              | Suggests how content should be handled (inline or download).             | `Content-Disposition: attachment; filename="file.pdf"`           |
| **Cache-Control**                    | Defines caching rules.                                                   | `Cache-Control: no-cache`                                        |
| **ETag**                             | Unique identifier for a version of a resource (used for caching).        | `ETag: "abc123"`                                                 |
| **Last-Modified**                    | Timestamp of last modification.                                          | `Last-Modified: Tue, 20 Feb 2024 10:00:00 GMT`                   |
| **Expires**                          | Date/time when the response is considered stale.                         | `Expires: Wed, 21 Feb 2024 10:00:00 GMT`                         |
| **Location**                         | URL to redirect the client to (used with 3xx).                           | `Location: /new-path`                                            |
| **Set-Cookie**                       | Sends cookies to the client.                                             | `Set-Cookie: sessionId=xyz; HttpOnly`                            |
| **Server**                           | Identifies the software handling the request (discouraged for security). | `Server: nginx`                                                  |
| **Strict-Transport-Security (HSTS)** | Forces HTTPS for the domain.                                             | `Strict-Transport-Security: max-age=31536000; includeSubDomains` |
| **Access-Control-Allow-Origin**      | CORS: specifies allowed request origins.                                 | `Access-Control-Allow-Origin: *`                                 |
| **Access-Control-Allow-Methods**     | CORS: allowed HTTP methods.                                              | `Access-Control-Allow-Methods: GET, POST`                        |
| **Access-Control-Allow-Headers**     | CORS: allowed custom headers.                                            | `Access-Control-Allow-Headers: Authorization`                    |
| **Authorization**                    | (Response variant less common) Used in some auth protocols.              | —                                                                |
| **WWW-Authenticate**                 | Defines auth method for a 401 Unauthorized response.                     | `WWW-Authenticate: Basic realm="User"`                           |
| **Retry-After**                      | Suggests when the client should try again (503, 429).                    | `Retry-After: 120`                                               |
| **X-Frame-Options**                  | Controls whether the page can be embedded in a frame.                    | `X-Frame-Options: DENY`                                          |
| **X-Content-Type-Options**           | Prevents MIME-sniffing.                                                  | `X-Content-Type-Options: nosniff`                                |
| **X-XSS-Protection**                 | (Legacy) Enables XSS filters in browsers.                                | `X-XSS-Protection: 1; mode=block`                                |

- Headers can be present in req too and you can access request headers using `req.headers` object

## 5. URLs and Query Strings

Node.js provides us built in `url` module to work with URLs and query string.

Example:

```js
const server = http.createServer((req, res)=>{
    const reqUrl = req.url;
    const parsedUrl = url.parse(reqUrl, true);
    res.end(JSON.stringify(parsedUrl))
})
```

Output : `http://localhost:5050/data?limit=10&offset=0`

```bash
{
  "protocol": null,
  "slashes": null,
  "auth": null,
  "host": null,
  "port": null,
  "hostname": null,
  "hash": null,
  "search": "?limit=10&offset=0",
  "query": { "limit": "10", "offset": "0" },
  "pathname": "/data",
  "path": "/data?limit=10&offset=0",
  "href": "/data?limit=10&offset=0"
}
```

Now you can access any thing from url.

## 6. HTTP Methods

REST APIs commonly use different HTTP methods to perform different types of operation on resources.

You can access the method in req object `req.method` and it returns string.

```js
const server = http.createServer((req, res)=>{
    const reqUrl = req.url;
    const parsedUrl = url.parse(reqUrl, true);
    const method = req.method;

    if(method === "GET"){
        // Get operations
    }else if(method === "POST"){
        //handle  post
    }
    res.end(JSON.stringify(parsedUrl))
})
```

### common HTTP methods** and their typical uses

| Method      | Safe? | Idempotent?    | Cacheable? | Typical Use                                                                      |
| ----------- | ----- | -------------- | ---------- | -------------------------------------------------------------------------------- |
| **GET**     | Yes   | Yes            | Yes        | Retrieve a resource (read-only).                                                 |
| **POST**    | No    | No             | Sometimes* | Create a resource, submit data, perform actions with side effects.               |
| **PUT**     | No    | Yes            | No         | Create or **replace** a resource at a known URL.                                 |
| **PATCH**   | No    | Not guaranteed | No         | **Partially update** a resource.                                                 |
| **DELETE**  | No    | Yes            | No         | Delete a resource.                                                               |
| **HEAD**    | Yes   | Yes            | Yes        | Same as GET but without a body; check metadata.                                  |
| **OPTIONS** | Yes   | Yes            | No         | Returns communication options for a resource (e.g., CORS preflight).             |
| **TRACE**   | Yes   | Yes            | No         | Diagnostic loopback; echoes the received request. Usually disabled for security. |
| **CONNECT** | No    | No             | No         | Establish a tunnel (commonly used for HTTPS through proxies).                    |

- **Safe** → Doesn’t modify server state.
- **Idempotent** → Making the same request repeatedly has the same effect as making it once.
- **Cacheable** → Responses can generally be cached (**POST** can be cached only if explicitly made cacheable by headers).

## 7. Let's create full application using http module

So idea is to create a todo application:

- Todo schema

```js
const Todo = {
    id:number,
    userId: number,
    title: string,
    description: string,
    status: "TODO" | "IN_PROGRESS" | "HOLD"| "DONE",
    createdAt: Date,
    updatedAt: Date,
    completedAt: Date 
}
```

- User Schema

```js
const User = {
    id:number,
    name: string,
    email: string,
    password: string,
    createdAt: Date
}
```

- API Endpoints

```bash
GET:
/todos - get all todo
/todos/:id - get todo with that id
/users - get all users
/users/:id - get single user with that id

POST:

/todos - create a new todo

payload: {
    userId, title, description
}

/users - create a new user

payload: {
    name, email, password
}

PUT:

/todos/:id - update the todo with that id

payload: {
    title, description, status
}

/users/:id - update user info

{
    name, email, password
}

DELETE:

/todos/:id - delete todo with id
/users/:id - delete user with id
```