import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

import { connectUsingMongoose } from "./src/config/mongooseConfig.js";


const server = express();
server.use(express.json());


server.listen(8000,()=>{
    console.log("Server is running at 8000");
    //connectToMongDB();
    connectUsingMongoose();
});
