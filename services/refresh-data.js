const { CronJob } = require("cron");
const {
  getAmsC19DayReports,
  fetchCovidJSONData,
  saveReports,
  getReports,
  isReportToday,
} = require("../helpers");

exports.updateAmsC19DataPeriodically = () => {
  const refreshC19AmsData = new CronJob(
    "*/14 12-20 * * *",
    onTick(),
    null,
    false,
    "Europe/Amsterdam"
  );

  refreshC19AmsData.start();
};

const onTick = async () => {
  const reports = await getReports();
  if (isReportToday(reports[0].Date_of_publication)) return;

  const NLC19MunReports = await fetchCovidJSONData();
  const amsC19Reports = await getAmsC19DayReports(NLC19MunReports);
  saveReports(amsC19Reports);
};
