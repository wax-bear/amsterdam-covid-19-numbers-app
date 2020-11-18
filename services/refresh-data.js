const { CronJob } = require("cron");
const {
  getAmsC19DayReport,
  fetchCovidJSONData,
  isReportToday,
} = require("../helpers");
const { Report } = require("../models/Report.model");

exports.updateAmsC19DataPeriodically = () => {
  const refreshC19AmsData = new CronJob(
    "*/14 12-20 * * *",
    onTick,
    null,
    false,
    "Europe/Amsterdam"
  );

  refreshC19AmsData.start();
};

const onTick = async () => {
  require("../config/db.config");
  const reports = await Report.find({}).sort("Date_of_publication");
  if (reports.length && isReportToday(reports[reports.length - 1].Date_of_publication)) return;

  const NLC19MunReports = await fetchCovidJSONData();
  const amsC19DayReport = await getAmsC19DayReport(NLC19MunReports);
  Report.create(amsC19DayReport);
};
