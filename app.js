import express from "express";
import { router as homeRoutes } from "./routes/home.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(homeRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});