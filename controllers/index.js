const fetch = require("node-fetch");

const { getDailyC19AmsData } = require("../helpers");

const { fetchCovidJSONData } = require("../services/");

exports.getDailyAmsDataController = async (_, response) => {
  try {
    const res = await fetchCovidJSONData();
    const dailyC19AmsData = await getDailyC19AmsData(res);
    response.render("index", {
      title: "People tested positive on COVID-19 in Amsterdam today",
      dailyC19AmsData,
    });
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error("Request failed, error object: " + errorObjString);
  }
};
