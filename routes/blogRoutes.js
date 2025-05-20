import express from "express";
import Blog from "../models/blog.js";
import upload from "../middleware/fileUpload.js";

const router = express.Router();

// Show add blog form
router.get("/add", (req, res) => {

    res.render("blog", {
        user: req.user,
    }); // your form view
});

router.post("/add", upload.single("coverImage"), async (req, res) => {
    const { title, description, body } = req.body;
    const coverImagePath = req.file ? `/uploads/${req.file.filename}` : "";

    try {
        const newBlog = new Blog({
            title,
            body,
            description,
            coverImage: coverImagePath,
            author: req.user._id
        });
        await newBlog.save();
        res.redirect("/");

    } catch (error) {
        console.error("Failed to create blog", error);
        res.status(500).send('internal server error.');
    }

});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found.");
        }
        res.render("readMore", {
            blog,
            user: req.user,

        })
    } catch (error) {
        console.error("Blogs loading error.", error);
        res.status(500).send("Internal server error.");
    }
});

export default router;
