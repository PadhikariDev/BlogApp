import express from "express";
import Blog from "../models/blog.js";  // if you want auth here

const router = express.Router();

// Show add blog form
router.get("/add", (req, res) => {

    res.render("blog", {
        user: req.user,
    }); // your form view
});

export default router;
