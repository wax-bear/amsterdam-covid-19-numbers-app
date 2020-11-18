const fs = require("fs");
const { Report } = require("./models/Report.model");

fs.readFile(__dirname + "/../public/files/ams_reports.txt", "UTF-8", async (err, data) => {
    if (err) return console.log(err);
    const parsedData = JSON.parse(data);

    try {
        require("./config/db.config");
        await Report.insertMany(parsedData);
        console.log("Inserted reports")
    } catch(err) {
        console.log(err);
    }
});

