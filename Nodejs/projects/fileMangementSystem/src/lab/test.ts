import fs from "fs";
import path from "path";
import {ROOT_PATH} from "../config/pathConfig";
fs.readdir(path.join(ROOT_PATH, "/projects/fileMangementSystem/bin"), (err, files)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(files);
    
});

console.log();


