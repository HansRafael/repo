import "reflect-metadata";
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import express from "express";
import path from "path"
import "./database"; //n precismaos escrever /index, pois o js ja sabe q queremos o index
import {routes} from "./routes";

const app = express();

app.use(express.static(path.join(__dirname,"..","public")));
app.set("views",path.join(__dirname,"..","public"));
app.engine("html",require("ejs").renderFile);
app.set("view engine","html");

app.get("/pages/client",(req,res)=>{
    return res.render("html/client.html")
})

app.get("/pages/admin",(req,res)=>{
    return res.render("html/admin.html")
})

const http = createServer(app); //criando protocolo HTTP
const io = new Server(http); //criando protocolo ws

io.on("connection", (socket: Socket) =>{
    //console.log("se conectou",socket.id);
});

app.use(express.json())

app.use(routes);

export {http,io};