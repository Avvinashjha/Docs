// const http = require("http");
// const url = require("url");
const fs = require("fs");
// const port = 5050;

// const server = http.createServer(async(req, res)=>{
//     const reqUrl = req.url;
//     const parsedUrl = url.parse(reqUrl, true);
//     const method = req.method;

//     if(parsedUrl.pathname === "/data"){
//         let data = fs.readFile("./data/test.txt", "utf-8").then((data)=>res.end(JSON.stringify(data)) );
         
//     }   
//     res.end(JSON.stringify(parsedUrl))
    
// })

// server.listen(port, ()=>{
//     console.log("http://localhost:5050")
// })

// Read file
const readFileSync = () => {
    const data = fs.readFileSync("./data/test.txt", "utf8");
    console.log(data);
}

// readFileSync();

const readFileAsync = () => {
    fs.readFile("./data/test.txt", "utf-8", (err, data)=>{
        if(err) console.log(err);
        console.log(data);
        
    });
    
}

// readFileAsync()

// Write file

// Write ot overwrite

const createANewFileS = (filename, content)=>{
    fs.writeFile(`./data/${filename}`, content, (err)=>{
        if(err) console.log(err);
        console.log(filename + " create success fully");
    } )
}

// createANewFile("test1.txt", "this is a test file")

const appendContentToAFile = (path, content) => {
    fs.appendFile(path, content, (err) => {
        if(err) console.log(err);
        console.log(path + " updated");
    })
}

// appendContentToAFile("./data/test1.txt", "hello there i wanted to add more")

// delete file 

const deleteFile = (path) => {
    fs.unlink(path, (err) => {
        if(err) console.log(err);
        console.log(path + " deleted");
        
    })
}

// deleteFile("./data/test1.txt")


// Working with directory

// Create a directory

const createDirectory = (path, folder) => {
    fs.mkdir(path + folder, {recursive: true}, (err) => {
        if(err) console.log(err);
        console.log(path+folder, "directory created");
    } )
}

// createDirectory("./data/", "txt");

// Read a directory content

const getDirectoryContent = (path) => {
    fs.readdir(path, (err, files)=> {
        if(err) console.log(err);
        console.log(files);
        
    })
}

// getDirectoryContent("./data/")

// Delete a directory

const deleteDirectory = (path) => {
    fs.rmdir(path, (err)=> {
        if(err) console.log(err);
        console.log(path, "deleted");
        
    })
}

// deleteDirectory("./data/txt")

// Promise based fs

const readFileAsyncV2 = async (path) => {
    const data = await fs.readFile(path, "utf-8");
    console.log(data);
}

// readFileAsyncV2("./data/test.txt")

// File stream (for large file)

const readFileInStream = (path) => {
    const readStream = fs.createReadStream(path, "utf-8");
    readStream.on("data", (chunk) => {
        console.log("----------");
        console.log(chunk);
        console.log("----------");
    })
}

// readFileInStream("./data/test.txt")

// Write stream 

const writeFileStream = (path) => {
    const ws = fs.createWriteStream(path);
    ws.write("Hello\n");
    ws.end("Done");
}

// writeFileStream("./Data/test1.txt")
// Read a big file using pipe

const readAndWriteUsingPipe = (pathToRead, pathToWrite) => {
    fs.createReadStream(pathToRead).pipe(fs.createWriteStream(pathToWrite));
}

// readAndWriteUsingPipe("./data/test.txt", "./data/test_r.txt")


// Watch a file for changes

const watchFolder = (path) => {
    fs.watch(path, (event, filename) => {
        console.log("File changed", filename);
        
    })
}

// watchFolder("./data")

const watchFile = (path) => {
    fs.watchFile(path, (prevStats, currentStats)=> {
        console.log(prevStats, currentStats);
        
    })
}

// watchFile("./data/")

// File Stats

const getFileStats = (path) => {
    fs.stat(path, (err, stats)=>{
        if(err) console.log(err);
        console.log(stats.isFile());
        console.log(stats.isDirectory());
        console.log(stats.size);
        console.log(stats.mtime);    
    })
}

// getFileStats("./data/test.txt")

// Copy a file

const copyAFile = (srcPath, destPath) => {
    fs.copyFile(srcPath, destPath, (err) => {
        if(err) console.log(err);
        console.log("File copied");
    })
}

// copyAFile("./data/test.txt", "./data/log.txt")


// Rename file

const renameFile = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, (err)=> {
        if(err) console.log(err);
        console.log(oldPath, "renamed to", newPath);
        
        
    })
}

// renameFile("./data/test.txt", "./data/bigtext.txt");

// move file