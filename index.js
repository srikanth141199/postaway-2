import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import { connectToMongoDB } from './src/config/mongodb.js';
import userRouter from './src/features/user/user.routes.js';



const server = express();
server.use(express.json());

//Routers

server.use("/api/users", userRouter);


server.listen(8000,()=>{
    console.log("Server is running at 8000");
    connectToMongoDB();
});
