const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const ivdripRouter = require("./routes/ivdripRoutes");
const teamRouter = require("./routes/teamRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const therapieRouter = require("./routes/therapieRoutes");
const commonRouter = require("./routes/commonRoutes");

const app = express();

app.enable("trust proxy");

// Global Middlewares
// Implement CORS
app.use(cors());

app.options("*", cors());

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
app.use("/ivdrips", ivdripRouter);
app.use("/therapies", therapieRouter);
app.use("/services", serviceRouter);
app.use("/teams", teamRouter);
app.use("/common", commonRouter);

app.use("/", (req, res) => {
    res.status(200).send("Beverly Hills Base Route");
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;