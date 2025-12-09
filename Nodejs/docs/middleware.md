# What is Middleware in node js?

Middleware is Node.js (usually in express) is a function that runs between the request and response.

It can modify the request, modify the response, stop the request or pass it to the next middleware.

So you can think middle ware as filter chain

```css
client -> [Middleware - 1 ] -> [Middleware - 2] --- [Routes] -> Controller -> Response
```

## What is middleware?

A middleware is simply a function with `(req, res, next)` parameters.

Where 

- req: incoming request
- res: response being sent
- next(): a function that send the request to the next middleware or route handler

if you don't call next(), the request will stop there.

## Simple Middleware example

```js
app.use((req, res, next)=> {
console.log("Request Recieved:", req.method, req.url);
next(); // pass to next middleware
```

If a GET /about request comes in:

```text
-> logs "GET /about"
-> passes to next()
-> route handler runs
```

## Built In Middlewares

Express has many built in middlewares

```js
app.use(express.json())
```

```js
app.use(express.static("public"));
```

## Middleware can be used on a specific routes

If you want to check if user is valid or authorized to access or any other check you kight want to perform in that case you can add middleware to a route.

```js
app.get("/admin", checkIfAdmin, (req, res)=>{...})
```

Here checkIfAdmin will verify if user is admin or not if not it can also return the proper response to the user.

You can have multiple middleware between a request and response and each middleware has different purpose.:
