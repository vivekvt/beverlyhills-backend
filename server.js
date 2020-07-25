const dotenv = require("dotenv");
const mongoose = require("mongoose");
const serverless = require("serverless-http");

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Shuting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
    .then((con) => console.log("DB Connection Successfull!"))
    .catch((err) => console.log("DB Connection Failed"));

module.exports.handler = serverless(app);

// Start Server
// const port = process.env.PORT || 4040;
// const server = app.listen(port, () => {
//     console.log(`${process.env.NODE_ENV} App is Listening at port `, port);
// });

// process.on("unhandledRejection", (err) => {
//     console.log("UNHANDLED REJECTION Shuting down...");
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });

// process.on("SIGTERM", () => {
//     console.log("SIGTERM RECIVED Shuting down...");
//     server.close(() => {
//         console.log("Process Terminated");
//     });
// });