const { getDayString, getReports } = require("../helpers");

exports.getDailyAmsDataController = async (_, response) => {
  try {
    const dailyC19AmsData = await getReports();
    const dayString = getDayString(dailyC19AmsData[0].Date_of_report);
    const reportedNumber = dailyC19AmsData[0].Total_reported;

    response.render("index", {
      title: `People tested positive on COVID-19 in Amsterdam ${dayString}: ${reportedNumber}`,
      dailyC19AmsData,
    });
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error("Request failed, error object: " + errorObjString);
  }
};
