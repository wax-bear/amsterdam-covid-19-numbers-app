const { getDayString } = require("../helpers");
const { Report } = require("../models/Report.model");
require("../config/db.config");

exports.getDailyAmsDataController = async (_, response) => {
  try {
    const dailyC19AmsReports = await Report.find({}).sort({"Date_of_publication": "desc"});
    const dayString = getDayString(dailyC19AmsReports[0].Date_of_report);
    const reportedNumber = dailyC19AmsReports[0].Total_reported;

    response.render("reports", {
      title: `People tested positive on COVID-19 in Amsterdam ${dayString}: ${reportedNumber}`,
      reports: dailyC19AmsReports
    });
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error("Request failed, error object: " + errorObjString);
  }
};
