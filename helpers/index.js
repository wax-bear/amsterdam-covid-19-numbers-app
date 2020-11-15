const fs = require('fs');
const util = require('util');
const fetch = require('node-fetch');
const path = require('path');

exports.fetchCovidJSONData = async () => {
  try {
    return await fetch(
      'https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.json'
    );
  } catch (err) {
    const errorObjString = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error('Covid API request failed, error object: ' + errorObjString);
  }
};

exports.getAmsC19DayReports = async (res) => {
  const munC19DayReports = await res.json();
  const amsC19DayReports = getAmsC19DayReports(munC19DayReports);

  return amsC19DayReports.reverse();
};

const getAmsC19DayReports = (munC19DayReports) => {
  const amsC19DayReports = getAmsReports(munC19DayReports);
  const mergedAmsC19DayReports = mergeSameDateReports(amsC19DayReports);

  return mergedAmsC19DayReports;
};

const getAmsReports = (munC19DayReports) => {
  return munC19DayReports.filter((munC19DayReport) => {
    return munC19DayReport.Municipality_name === 'Amsterdam';
  });
};

const mergeSameDateReports = (amsC19DayReport) => {
  let i = amsC19DayReport.length;

  while (i--) {
    const nextElIndex = i - 1;
    if (
      amsC19DayReport[i].Date_of_publication ===
      amsC19DayReport[nextElIndex].Date_of_publication
    ) {
      amsC19DayReport[i].Deceased += amsC19DayReport[nextElIndex].Deceased;
      amsC19DayReport[i].Hospital_admission += amsC19DayReport[nextElIndex].Hospital_admission;
      amsC19DayReport[i].ROAZ_region += ', ' + amsC19DayReport[nextElIndex].ROAZ_region;
      amsC19DayReport[i].Total_reported += amsC19DayReport[nextElIndex].Total_reported;

      amsC19DayReport.splice(nextElIndex, 1);
      i--;
    }
  }

  return amsC19DayReport;
};

exports.getDayString = (compareDateString) => {
  const d1 = new Date();
  const d2 = new Date(compareDateString);
  const reportIsToday = d1.toDateString() === d2.toDateString();

  return reportIsToday ? 'today' : 'yesterday (latest data)';
};

exports.saveReports = function(reports) {
  const stringifiedReports = JSON.stringify(reports);
  fs.writeFile(path.join(__dirname, '/../public/files/ams_reports.txt'), stringifiedReports, (err) => {
    if(err) console.error(err);
  });
};

exports.getReports = async function() {
  const readFile = util.promisify(fs.readFile);
  const amsReportsString =  await readFile(path.join(__dirname, '/../public/files/ams_reports.txt'));
  return JSON.parse(amsReportsString);
}
