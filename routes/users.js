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
        const token = await user.matchPasswordAndGenerateToken(email, password);
        console.log(token);
        if (!token) {
            return redirect("/signup");
        }
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect email or password."
        });

    }
});

export default router;
