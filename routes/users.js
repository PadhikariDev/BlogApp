import { Router } from "express";
import user from "../models/users.js";

const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});


router.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const newUser = await user.create({ fullname, email, password });

        return res.redirect("/");
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await user.matchPassword(email, password);
        if (!userData) {
            return res.redirect("/signup");
        }
        return res.redirect("/");
    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(401).json({ error: err.message });
    }
});

export default router;
