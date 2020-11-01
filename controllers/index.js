const { getDailyC19AmsData, getDayString } = require('../helpers');
const { fetchCovidJSONData } = require('../services');

exports.getDailyAmsDataController = async (_, response) => {
  try {
    const res = await fetchCovidJSONData();
    const dailyC19AmsData = await getDailyC19AmsData(res);
    const dayString = getDayString(dailyC19AmsData[0].Date_of_report);

    response.render('index', {
      title: `People tested positive on COVID-19 in Amsterdam ${dayString}: ${dailyC19AmsData[0].Total_reported}`,
      dailyC19AmsData,
    });
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error('Request failed, error object: ' + errorObjString);
  }
};
