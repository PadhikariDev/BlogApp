import { Router } from "express";
import comments from "../models/comments.js";
const router = Router();

router.post("/addComments", async (req, res) => {
    try {
        const { commentBody, blogId } = req.body;

        const newComment = new comments({
            commentBody,
            commentUser: req.user._id,
            blog: blogId
        });

        await newComment.save();
        res.redirect(`/blogs/${blogId}`);

    } catch (error) {
        console.error("Failed to add comments", error);
        res.status(500).send('internal server error.');
    }
});

export default router;

