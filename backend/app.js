import fs from "node:fs";
import path from "node:path";
import express, { urlencoded, json } from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rootDir from "./utils/path.js";
import { router as componentRoutes } from "./routes/component.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as podsRoutes } from "./routes/pods.js";
import { dbConnect } from "./database/connection.js";

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(rootDir, "backend", "logs", "access.log"),
    { flags: "a" }
);

app.use(helmet());

app.use(compression());

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use(urlencoded({ extended: false }));

app.use(json({}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    next();
});

app.use(componentRoutes);
app.use(authRoutes);
app.use(podsRoutes);

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;

    const message = err.message;

    const data = err.data;

    res.status(status)
        .set("Content-Type", "application/json")
        .json({ message, data });
});

dbConnect(() => {
    app.listen(process.env.PORT || 8080);
});
