const express = require("express");
const {open} = require("sqlite");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express()
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "user.db");


let db = null;


const initilizeDbAndServer = async() =>{
    try{
    db = await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
    app.listen(5000, () => {
        console.log("server is running");
    })}catch(e){
        console.log(`Db error ${e.message}`);
    }
}

initilizeDbAndServer();


app.post("/student" , async(request,response) =>{
    const {name,phone} = request.body;
    const query = `INSERT INTO student (name,phone) VALUES ("${name}",${phone});`;
    await db.run(query);
    response.send("Student updated Successfully...");
})


// Message update API 

app.post("/message", async(request,response) => {
    const {name,email,message} = request.body;
    const query = `INSERT INTO message (name,email,message) VALUES ("${name}","${email}", "${message}");`;

    await db.run(query);
})