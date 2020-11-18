const { getDayString, fetchCovidJSONData, getAmsC19DayReport } = require("..");
let amsC19DayReport;

beforeAll(() => {
  return new Promise((resolve) => {
    fetchCovidJSONData().then((res) => {
      getAmsC19DayReport(res).then((report) => {
        amsC19DayReport = report;
        resolve();
      });
    });
  });
});

test("getAmsC19DayReport returns merged reports", () => {
  expect(amsC19DayReport).toMatchSnapshot({
    ROAZ_region: "SpoedZorgNet, Netwerk Acute Zorg Noordwest",
  });
});

test("getAmsC19DayReport returns a report from Amsterdam", () => {
  expect(amsC19DayReport).toMatchSnapshot({
    Municipality_name: "Amsterdam",
  });
});

test("getDayString returns \"today\" if the date string is today", () => {
  const dayString = new Date().toDateString();

  expect(getDayString(dayString)).toMatch("today");
});

test("getDayString returns \"yesterday (latest data)\" if the date string is yesterday", () => {
  const d = new Date();
  const y = new Date(d.setDate(d.getDate() - 1));

  expect(getDayString(y.toDateString())).toMatch("yesterday (latest data)");
});
