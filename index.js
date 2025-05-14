import express from "express";
import connectMD from "./connection.js";


const PORT = 1000;
const app = express();


app.use(express.json());

connectMD("mongodb://127.0.0.1:27017/BlogApp")
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch((error) => {
        console.error("Cannot establish connection to the database.");
    });


app.listen(PORT, () => {
    console.log("Server has been started.");
})