import express from 'express';
import http from "http";
import socketClusterServer from 'socketcluster-server';
import serveStatic from 'serve-static';
import path from 'path';
import 'dotenv/config';

const app = express();

 
app.use(serveStatic(path.resolve(__dirname, 'public')));
 
const httpServer = http.createServer();
 
// Attach express to our httpServer
httpServer.on('request', app);
console.log("server");

 
// Attach socketcluster-server to our httpServer
const scServer = socketClusterServer.attach(httpServer);
 
scServer.on('connection', function (socket) {
  // ... Handle new socket connections here

  console.log("client connected");
  socket.on("sendMessage", (data) => {
    console.log("data", data);
    scServer.exchange.publish('data', data);
  })  
});

console.log(process.env.MY_SECRET);
 
httpServer.listen(8000);