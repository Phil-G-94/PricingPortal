import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { router as componentRoutes } from "./routes/component.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as podsRoutes } from "./routes/pods.js";
import { dbConnect } from "./database/connection.js";

const app = express();

const allowedOrigins = [
    "https://pricingportal.netlify.app",
    "http://localhost:5173"
];

app.use(helmet());

app.use(compression());

app.use(express.static("public"));

app.use(urlencoded({ extended: false }));

app.use(json({}));

/* replaces own implementation of CORS middleware */
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://pricingportal.netlify.app");

//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE"
//     );

//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Authorization"
//     );

//     next();
// });

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', "Access-Control-Allow-Headers"],

}));

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
