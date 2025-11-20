# Topics

## 1. What is Node Js?

Node.js is a JavaScript runtime environment that let's you run JavaScript outside the browser.

Normally, Javascript runs only in browser, Node.js uses Google V8 engine to run Javascript on computer or server.

In simple words, Node.js is for backend development using Javascript.

## 2. Why Node Js?

Node.js is:

- **Fast**: Node.js is event driven and non-blocking.
- **Scalable**: Can handle 1000s of request simultaneously
- **Use Javascript everywhere**
- **Large Package ecosystem**
- **Perfect for I/O apps**
  - Apps that involves lot of reads and write are best suited for node
  - Like chat app
  - Live notification apps
  - Online gaming apps
  - Streaming Apps

## 3. What is a server?

A server is a computer or program that:

- Listen to requests
- Process those request
- Sends back the response

```text
client/browser -> sends request -> server receives request -> server process the request -> server make the response -> server send back the response -> browser parses the response and show it to client
```

## 4. What are the ways to create a server?

There are many ways to create a server and it depends on tech you are using

In General

- Using Apache (PHP)
- Using Nginx
- Using ISS (Microsoft)
- Using python frameworks (Django, Flask, FastAPI)
- Using Java (Spring, Spring Boot, Core Servlet)
- Using Ruby on Rails
- Using Golang

In Node.js

You can create a server using

- HTTP module (built in to node)
- Using express

## 5. What is a traditional servers?

Traditional servers (Apache, PHP, etc) works in a multi-thread blocking model:

- Use one thread per request
- Heavy on resources
- Slower with many users
- Blocking I/O -> waits ofr operation to finish

Example Tech:

- Apache + PHP
- Java + Tomcat
- Ruby On Rails

## 6. What is node js servers?

Node.js servers works differently.

Characteristics of Node.js servers:

- Single-threaded
- Non-blocking
- Event driven architecture
- Can handle thousands of connections at once
- Very lightweight

Node.js does not create a new thread for every request, Instead:

- The event loop receives a request
- Sends ling tasks to background workers
- Returns the response when done

This is why nodejs is fast and scalable.

## 7. Where to use node.js?

If you Application involves lot of input output, like reading and writing

- Chat apps
- messaging
- Live tracking
- Live streaming
- File uploads
- File downloads ...

In that case you should use node js, because nodejs performs best when there is read and write are there.

## 8. Where to avoid node.js?

If your application is compute heavy, like lots of calculation or cpu intensive tasks

- Like you want parallel processing
- You want to use multi threading 

In those case as node is single threaded it will not be the best fit for that use case in that case going with Java or Golang or Python based or Other multi threaded language will be better choice.