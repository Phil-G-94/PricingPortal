import express, { urlencoded, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { router as componentRoutes } from "./routes/component.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as podsRoutes } from "./routes/pods.js";
import { dbConnect } from "./database/connection.js";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
    "https://pricingportal.netlify.app",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(helmet());

app.use(compression());

app.use(express.static("public"));

app.use(urlencoded({ extended: false }));

app.use(json({}));

// app.use(cookieParser()); required to handle token through cookies instead of localStorage

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

(async function startServer() {
    try {
        await dbConnect();

        app.listen(process.env.PORT || 8080, () => {
            console.log(
                "Server is running on port ",
                process.env.PORT || 8080
            );
        });
    } catch (error) {
        console.log(error);
        process.exitCode = 1;
    }
})();
