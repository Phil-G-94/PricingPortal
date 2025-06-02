import express, { urlencoded, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import * as authController from "./controllers/auth.js";
import { dbConnect } from "./database/connection.js";
import { isAuth } from "./middleware/isAuth.js";
import router from "./router.js";

const app = express();

/**
 * cors config
 */
app.set("trust proxy", 1);

const allowedOrigins = ["https://pricingportal.netlify.app", "http://localhost:5173"];

/**
 * middleware
 */

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
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());

app.use(helmet());

app.use(express.static("public"));

app.use(urlencoded({ extended: true }));

app.use(json({}));

app.use(cookieParser());

/**
 * routes
 */

app.post("/signup", authController.postSignup);

app.post("/login", authController.postLogin);

app.use("/api", isAuth, router);

/**
 * error handling middleware
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;

  const message = err.message;

  const data = err.data;

  res.status(status).set("Content-Type", "application/json").json({ message, data });
});

/**
 * connect to DB and instantiate server
 */
(async function startServer() {
  try {
    await dbConnect();

    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is running on port", process.env.PORT || 8080);
    });
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
})();

/**
 * shutdown handling
 */

const handleShutdown = async (signal) => {
  console.log(`${signal} received. Closing database connection...`);

  console.log("Database connection closed. Exiting process.");

  process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
