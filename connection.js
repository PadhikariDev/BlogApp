import mongoose from "mongoose";

function connectMD(url) {
    return mongoose.connect(url);
}

export default connectMD;