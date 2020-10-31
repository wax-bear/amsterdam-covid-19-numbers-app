const getAmsEntries = (dailyC19AmsNumbersArray) => {
  return dailyC19AmsNumbersArray.filter(
    (munDayReport) => munDayReport.Municipality_name === 'Amsterdam'
  );
};

const mergeSameDateEntries = (dailyC19AmsNumbersArray) => {
  let i = dailyC19AmsNumbersArray.length;

  while (i--) {
    const nextElIndex = i - 1;
    if (
      dailyC19AmsNumbersArray[i].Date_of_publication ===
      dailyC19AmsNumbersArray[nextElIndex].Date_of_publication
    ) {
      dailyC19AmsNumbersArray[i].Deceased += dailyC19AmsNumbersArray[nextElIndex].Deceased;
      dailyC19AmsNumbersArray[i].Hospital_admission += dailyC19AmsNumbersArray[nextElIndex].Hospital_admission;
      dailyC19AmsNumbersArray[i].ROAZ_region += ', ' + dailyC19AmsNumbersArray[nextElIndex].ROAZ_region;
      dailyC19AmsNumbersArray[i].Total_reported += dailyC19AmsNumbersArray[nextElIndex].Total_reported;

      dailyC19AmsNumbersArray.splice(nextElIndex, 1);
      i--;
    }
  }

  return dailyC19AmsNumbersArray;
};

const getDailyC19AmsNumbersArray = (dailyC19MunNumbersArray) => {
  let dailyC19AmsNumbersArray = getAmsEntries(dailyC19MunNumbersArray);
  dailyC19AmsNumbersArray = mergeSameDateEntries(dailyC19AmsNumbersArray);

  return dailyC19AmsNumbersArray;
};

exports.getDailyC19AmsData = async (res) => {
  const dailyC19MunNumbersArray = await res.json();
  const dailyC19AmsNumbersArray = getDailyC19AmsNumbersArray(
    dailyC19MunNumbersArray
  );

  return dailyC19AmsNumbersArray.reverse();
};

exports.getDayString = (compareDateString) => {
  const d1 = new Date();
  const d2 = new Date(compareDateString);
  const reportIsToday = d1.toDateString() === d2.toDateString();

  return reportIsToday ? 'today' : 'yesterday (latest data)';
};
