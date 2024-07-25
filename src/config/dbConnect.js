import mongoose from "mongoose";

async function dbConnect() {
    mongoose.connect(process.env.DB_CONNECT);
    return mongoose.connection;
}

export default dbConnect;