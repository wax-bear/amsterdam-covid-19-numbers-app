const fetch = require("node-fetch");

const { getDailyC19AmsData } = require("../helpers");

exports.getDailyAmsDataController = async (_, response) => {
  try {
    const res = await fetch(
      "https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.json"
    );
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
