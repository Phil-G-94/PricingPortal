import express, { urlencoded, json } from "express";
import { router as componentRoutes } from "./routes/component.js";
import { router as authRoutes } from "./routes/auth.js";
import { dbConnect } from "./database/connection.js";

const app = express();
const port = 8080;

app.use(express.static("public"));

app.use(urlencoded({ extended: false }));

app.use(json({}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // specify allowed CORS origin => all

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    ); // specify allowed methods

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    ); // specify allowed request headers

    next();
});

app.use(componentRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
    // console.error(err);

    const status = err.statusCode || 500;

    const message = err.message;

    const data = err.data;

    res.status(status).json({ message, data });
});

dbConnect(() => {
    app.listen(port);
});
