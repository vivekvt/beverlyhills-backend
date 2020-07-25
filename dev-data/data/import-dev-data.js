const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Ivdrip = require("./../../models/ivdripModel");
const Therapie = require("./../../models/therapieModel");
const Service = require("./../../models/serviceModel");
const Team = require("./../../models/teamModel");
const data = require("./data");

dotenv.config({ path: "../../config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then((con) => console.log("DB Connection Successfull!"))
    .catch((err) => console.log("DB Connection Failed"));

const importData = async() => {
    try {
        await Ivdrip.create(data.ivdrip, { validateBeforeSave: false });
        await Therapie.create(data.therapies, { validateBeforeSave: false });
        await Service.create(data.services, { validateBeforeSave: false });
        await Team.create(data.team, { validateBeforeSave: false });
        console.log("Data successfully loaded !");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// Delete Data from collec
const deleteData = async() => {
    try {
        await Ivdrip.deleteMany();
        await Therapie.deleteMany();
        await Service.deleteMany();
        await Team.deleteMany();
        console.log("Data successfully deleted !");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}