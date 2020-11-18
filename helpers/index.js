const fetch = require("node-fetch");

exports.fetchCovidJSONData = async () => {
  try {
    return await fetch(
      "https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.json"
    );
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error("Covid API request failed, error object: " + errorObjString);
  }
};

exports.getAmsC19DayReport = async (res) => {
  const munC19DayReports = await res.json();
  const amsC19DayReport = filterAndMergeC19DayData(munC19DayReports);

  return amsC19DayReport;
};

const filterAndMergeC19DayData = (munC19DayReports) => {
  const Report = getAmsTodayReports(munC19DayReports);
  const mergedAmsC19DayReports = mergeReports(Report);

  return mergedAmsC19DayReports[0];
};

const getAmsTodayReports = (munC19DayReports) => {
  return munC19DayReports.filter((munC19DayReport) => {
    return munC19DayReport.Municipality_name === "Amsterdam" && this.isReportToday(munC19DayReport.Date_of_publication);
  });
};

const mergeReports = (amsC19DayReport) => {
  let i = amsC19DayReport.length;

  while (i--) {
    const nextElIndex = i - 1;

    amsC19DayReport[i].Deceased += amsC19DayReport[nextElIndex].Deceased;
    amsC19DayReport[i].Hospital_admission += amsC19DayReport[nextElIndex].Hospital_admission;
    amsC19DayReport[i].ROAZ_region += ", " + amsC19DayReport[nextElIndex].ROAZ_region;
    amsC19DayReport[i].Total_reported += amsC19DayReport[nextElIndex].Total_reported;

    amsC19DayReport.splice(nextElIndex, 1);
    i--;
  }

  return amsC19DayReport;
};

exports.getDayString = (compareDateString) => {
  return this.isReportToday(compareDateString) ? "today" : "yesterday (latest data)";
};

exports.isReportToday = (compareDateString) => {
  const d1 = new Date();
  const d2 = new Date(compareDateString);
  return d1.toDateString() === d2.toDateString();
};
