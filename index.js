import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectMD from "./connection.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middleware/authentication.js";

//loading env variables
dotenv.config();

//fix dir name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const mongoUrl = process.env.MONGO_URI;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    });
});

connectMD(mongoUrl)
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch((error) => {
        console.error("Cannot establish connection to the database.");
    });


app.listen(PORT, () => {
    console.log(`Server has been started. at ${PORT}`);
})
