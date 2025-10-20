#!/usr/bin/env node

// We are using .mjs so that in package.json we don;t need type="module" instead of commonjs
import { createServer } from "node:http";
import { appendFile, cp, createReadStream, readdir, stat } from "node:fs";
import { join, extname } from "node:path";
import { arch, cpus, freemem, hostname, platform, totalmem } from "node:os";
import { EventEmitter } from "node:events";
// console.log(process.argv);
// Mime Types for comkon file extentions
const folderArg = process.argv[2];
const folderToServe = folderArg ? folderArg : "./public";

console.log(`Serving files from: ${folderToServe}`);
const mimeTypes = {
  ".html": "text/html",
  ".txt": "text/plain",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
};
const server = createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "content-type": mimeTypes[".html"] });
    res.end(`
            <h1>CLI File Saver</h1>
            <ul>
                <li> <a href="/files">View Files</a></li>
                <li> <a href="/stats">View Stats</a></li>
            </ul>
            `);
  } else if (method === "GET" && url === "/files") {
    // const folder = "./public";
    readdir(folderToServe, (err, files) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Unable to read directory\n" + err);
        return;
      }

      let list = "<h1>Files </h1><ul>";
      files.forEach((file) => {
        list += `<li><a href="/files/${file}">${file}</li>`;
      });
      list += '</ul><a href="/"><- Back</a>';
      res.writeHead(200, { "content-type": "text.html" });
      res.end(list);
    });
  } else if (method === "GET" && url === "/stats") {
    const freeMemory = (freemem() / 1024 / 1024).toFixed(2); //MB
    const totalMemory = (totalmem() / 1024 / 1024).toFixed(2);
    const usedMemory = (totalMemory - freeMemory).toFixed(2);

    const cpu = cpus()[0]; // Get first cpu core info

    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      `
            <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> System Stats</title>
      <meta http-equiv="refresh" content="30">  <!-- Auto-refresh every 2 seconds -->
    </head>
    <body>
      <h1>System Stats</h1>
      <ul>
        <li><strong>Platform:</strong> ${platform()}</li>
        <li><strong>Hostname:</strong> ${hostname()}</li>
        <li><strong>Architecture:</strong> ${arch()}</li>
        <li><strong>Total Memory:</strong> ${totalMemory} MB</li>
        <li><strong>Free Memory:</strong> ${freeMemory} MB</li>
        <li><strong>Used Memory:</strong> ${usedMemory} MB</li>
        <li><strong>CPU Model:</strong> ${cpu.model}</li>
        <li><strong>CPU Speed:</strong> ${cpu.speed} MHz</li>
        <li><strong>Cores:</strong> ${cpus().length}</li>
      </ul>
      <a href="/">← Back</a>
    </body>
    </html>
            `
    );
  } else if (method === "GET" && url.startsWith("/files/")) {
    // Extract File Name
    const urlPath = url.slice(6); // "/files/" -> 7 Characters
    const filePath = join(folderToServe + urlPath);

    // Check if file exists
    stat(filePath, (err, fileStatus) => {
      if (err ) {
        res.writeHead(404, { "content-type": mimeTypes[".txt"] });
        res.end("File Not Found\n" + err + url);
        return;
      }

      if(fileStatus.isFile()){
        logger.emit("FileServed", urlPath);

      // Detect the content type of the file
      const ext = extname(urlPath);
      const contentType = mimeTypes[ext] || "application/octet-stream";

      // Stream file
      const readStream = createReadStream(filePath);
      res.writeHead(200, { "content-type": contentType });
      readStream.pipe(res); // Stream file
      }else if(fileStatus.isDirectory()){
        readdir(filePath, (err, files)=> {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Unable to read directory\n');
                return;
            }
             let list = `
          <h1> Folder: /${urlPath || 'files'}</h1>
          <ul>
            <li><a href="/files">< Back to root</a></li>
            <li><strong>Contents:</strong></li>
        `;

        files.forEach(file => {
          const fullPath = urlPath ? `${urlPath}/${file}` : file;
          list += `<li><a href="/files/${fullPath}">${file}</a></li>`;
        });

        list += '</ul><a href="/">< Back to Home</a>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(list);
        })
      }

      
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found\n");
  }
});

const logger = new EventEmitter();

logger.on("FileServed", (fileName) => {
  const date = new Date().toISOString();
  const free = (freemem() / 1024 / 1024).toFixed(2);
  const logEntry = `[${date}] Served: ${fileName} | Free Memory: ${free} MB\n`;
  console.log("Here");

  appendFile("access.log", logEntry, (err) => {
    if (err) {
      console.log("Failed to write to log", err);
    }
  });
});

server.listen(5005, "127.0.0.1", () => {
  console.log("CLI File Server started on: http://127.0.0.1:5005");
});
