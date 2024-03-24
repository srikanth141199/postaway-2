import mongoose from "mongoose";

const url = "mongodb://localhost:27017/postaway2";

export const connectUsingMongoose = async () => {

    try {
        await mongoose.connect(url, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("Mongo DB connected using Mongoose");
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        console.log(error);
    }
}

