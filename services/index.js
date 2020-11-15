const schedule = require('node-schedule');
const { getAmsC19DayReports, fetchCovidJSONData, saveReports } = require('../helpers');

exports.updateCovid19DataInAmsterdamPeriodically = async () => {
  schedule.scheduleJob('0 12-16 * * *', async() => {
    const response = await fetchCovidJSONData();
    const amsC19Reports = await getAmsC19DayReports(response);
    saveReports(amsC19Reports);
  });
};
