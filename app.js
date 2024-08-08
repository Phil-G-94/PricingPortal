import express from "express";
import { router as homeRoutes } from "./routes/home.js";
import { dbConnect } from "./database/connection.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(homeRoutes);

dbConnect(() => {
    app.listen(port);
});