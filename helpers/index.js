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
