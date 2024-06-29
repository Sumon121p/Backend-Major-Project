const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const MONGO_URL = "mongodb://localhost:27017/majorproject";
mongoose.connect(MONGO_URL).then(()=>{
    console.log("Database connect");
}).catch((err)=>{
    console.log(err);
})

app.use("/api/List", require("./Route/ListRouter"));

app.listen(8080, ()=>{
    console.log("Server running on 8080");
})
