import express from "express";
import fs from 'fs'

const app = express();

const data = JSON.parse(fs.readFileSync("./MOCK_DATA.json",{ encoding: "utf8"}));

app.get("/", async(req, res)=>{
    res.json(JSON.parse(data))
})

app.get("/data", (req, res)=>{
    const {limit, offset} = req.query;
    const dataToReturn = data.slice(parseInt(offset), (parseInt(offset)+parseInt(limit)));
    const temp = {
        data: dataToReturn,
        hasMore: data.length > (parseInt(limit) + parseInt(offset)),
        totalPages: data.length / limit 
    }
    res.json(temp )
})


app.get("/search/:key/:search", (req, res)=>{
    const {key, search} = req.params;
    const filteredData = data.filter((item)=> item[key].includes(search));
    res.json(filteredData);
})

app.get("/name/:search", (req, res)=>{
    const {search} = req.params;
    const filter = data.filter((item)=> item.first_name.toLowerCase().includes(search.toLowerCase()));
    const idName = filter.map((item)=> ({name: item.first_name+" "+ item.last_name, id: item.id, email: item.email}))
    res.json(idName);
})

app.get("/ip/:lastLimit", (req, res)=>{
    const {lastLimit} = req.params;

    const filteredData = data.filter((item)=> {
        const ip = item.ip_address;
        const segmentArr = ip.split(".");
        const lastSegment = segmentArr[segmentArr.length - 1];
        if(parseInt(lastSegment) < parseInt(lastLimit)){
            return true;
        }else{
            return false
        }
    })
    res.json(filteredData);
})




app.listen(5050, ()=>{
    console.log("http://localhost:5050");
})