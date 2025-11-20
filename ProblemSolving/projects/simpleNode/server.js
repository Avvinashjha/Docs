import express, { json } from "express";

const app = express();
app.use(json());


const name = "avinash";

const data = [{
    id: 1,
    name: "Raunak"
},{
    id: 2, 
    name: "Avinash"
}]

app.get("/", (req, res)=>{
    const response = {
        name
    } 
    res.status(200).json(response);
})

app.get("/data", (req, res)=> {
    res.json(data)
})

app.get("/data/:id", (req, res)=> {
    const id = Number(req.params.id);
    const user = data.find((item) => item.id === id)
    if(user === undefined){
        const response = {
            message: "User not found with id: "+ id,
            data: []
        }
        res.status(404).json(response);
    }else{
        const response = {
            message: "User found",
            data: [user]
        }
        res.status(200).json(response);
    }
})

app.post("/data", (req, res)=>{
    const {id, name} = req.body;
    if(typeof id !== "number"){
        const response = {
            message: "Id should be a number"
        }
        return res.status(400).json(response);
    }
    if(data.some(item => item.id === id)){
        const response = {
            message: "Id is already present"
        }
        return res.status(400).json(response);
    }
    if( name === undefined){
         const response = {
            message: "name is required"
        }
        return res.status(400).json(response);
    }
    if( name.length === 0){
         const response = {
            message: "name should not be an empty string"
        }
        return res.status(400).json(response);
    }
    data.push({id, name});
    const response = {
        message: "User created"
    }
    res.status(201).json(response);
})

app.patch("/data/:id", (req, res)=>{
    const {name} = req.body;
    const id = parseInt(req.params.id);
    if( name === undefined){
         const response = {
            message: "name is required"
        }
        return res.status(400).json(response);
    }
    if( name.length === 0){
         const response = {
            message: "name should not be an empty string"
        }
        return res.status(400).json(response);
    }
    const user = data.find(item => item.id === id);
    user.name = name;
    res.status(202).json({
        message: "Updated successfully"
    })
})


app.listen(5050, ()=>{
    console.log("http://localhost:5050");
})