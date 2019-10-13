import app from './app/app'
import * as http from "http";

const { PORT = 3000 } = process.env;

const httpServer = http.createServer(app);
httpServer.listen(PORT, ()=>{
    console.log("Server is Running")
});
