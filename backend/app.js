import express, { urlencoded, json } from "express";
import { router as homeRoutes } from "./routes/home.js";
import { dbConnect } from "./database/connection.js";

const app = express();
const port = 8080;

app.use(express.static("public"));

app.use(urlencoded({ extended: false }));

app.use(json({}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // specify allowed CORS origin => all

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // specify allowed methods

    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // specify allowed request headers

    next();
});

app.use(homeRoutes);

dbConnect(() => {
    app.listen(port);
});