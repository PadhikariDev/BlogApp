import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    commentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
}, { timestamps: true })

const comments = mongoose.model("Comments", commentSchema);

export default comments;
