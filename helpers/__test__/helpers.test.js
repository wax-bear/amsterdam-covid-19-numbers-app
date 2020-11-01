const { getDayString, getAmsC19DayReports } = require('..');
const { fetchCovidJSONData } = require('../../services');
let amsC19DayReports;

beforeAll(() => {
  return new Promise((resolve) => {
    fetchCovidJSONData().then((covidJSONData) => {
      getAmsC19DayReports(covidJSONData).then((data) => {
        amsC19DayReports = data;
        resolve();
      });
    });
  });
});

test('getAmsC19DayReports returns an array of length > 0', async () => {
  expect(amsC19DayReports).not.toHaveLength(0);
});

test('getAmsC19DayReports returns merged reports', async () => {
  amsC19DayReports.forEach((report) => {
    expect(report).toMatchSnapshot({
      ROAZ_region: 'SpoedZorgNet, Netwerk Acute Zorg Noordwest',
    });
  });
});

test('getAmsC19DayReports returns an array of reports from Amsterdam', async () => {
  amsC19DayReports.forEach((report) => {
    expect(report).toMatchSnapshot({
      Municipality_name: 'Amsterdam',
    });
  });
});

test('getDayString returns "today" if the date string is today', () => {
  const dayString = new Date().toDateString();

  expect(getDayString(dayString)).toMatch('today');
});

test('getDayString returns "yesterday (latest data)" if the date string is yesterday', () => {
  const d = new Date();
  const y = new Date(d.setDate(d.getDate() - 1));

  expect(getDayString(y.toDateString())).toMatch('yesterday (latest data)');
});
