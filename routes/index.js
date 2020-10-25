const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (request, response) {
  try {
    const res = await fetch('https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.json');  

    if (res.statusCode !== 200) new Error('Request Failed.\n' + `Status Code: ${res.statusCode}`);

    const dailyC19AmsData = await getDailyC19AmsData(res);
  
    response.render('index', {
      title: 'People tested positive on COVID-19 in Amsterdam today',
      dailyC19AmsData
    });
  } catch (e) {
      console.error(`Got error: ${e.message}`);
  }
});

async function getDailyC19AmsData(res) {
  const dailyC19MunNumbersArray = await res.json();
  const dailyC19AmsNumbersArray = getDailyC19AmsNumbersArray(dailyC19MunNumbersArray);

  return dailyC19AmsNumbersArray;
}

function getDailyC19AmsNumbersArray(dailyC19MunNumbersArray) {
  let dailyC19AmsNumbersArray = getAmsEntries(dailyC19MunNumbersArray);
  dailyC19AmsNumbersArray = mergeSameDateEntries(dailyC19AmsNumbersArray);

  return dailyC19AmsNumbersArray;
}
  
function getAmsEntries(dailyC19AmsNumbersArray) {
  return dailyC19AmsNumbersArray.filter((munDayReport) => munDayReport.Municipality_name === 'Amsterdam');
}


function mergeSameDateEntries(dailyC19AmsNumbersArray) {
  let i = dailyC19AmsNumbersArray.length;
  
  while (i--) {
    const nextElIndex = i - 1;
    if (dailyC19AmsNumbersArray[i].Date_of_publication === dailyC19AmsNumbersArray[nextElIndex].Date_of_publication) {
      dailyC19AmsNumbersArray[i].Deceased += dailyC19AmsNumbersArray[nextElIndex].Deceased;
      dailyC19AmsNumbersArray[i].Hospital_admission += dailyC19AmsNumbersArray[nextElIndex].Hospital_admission;
      dailyC19AmsNumbersArray[i].ROAZ_region += ', ' + dailyC19AmsNumbersArray[nextElIndex].ROAZ_region;
      dailyC19AmsNumbersArray[i].Total_reported += dailyC19AmsNumbersArray[nextElIndex].Total_reported;
      
      dailyC19AmsNumbersArray.splice(nextElIndex, 1);
      i--;
    }
  }
  
  return dailyC19AmsNumbersArray;
}

module.exports = router;

// async function getTodayC19AmsData(res) {
//   const dailyC19MunDataArray = await res.json();
//   let todayC19AmsData = getAmsTodayEntries(dailyC19MunDataArray);
//   todayC19AmsData = mergeSameDateEntries(todayC19AmsData);

//   return todayC19AmsData;
// }

// function getAmsTodayEntries(dailyC19AmsNumbersArray) {
//   return dailyC19AmsNumbersArray.filter((munDayReport) => {
//     munDayReport.Municipality_name === 'Amsterdam' &&
//     isToday(munDayReport.Date_of_publication);
//   });
// }

// function isToday(publicationDate) {
//   publicationDate = new Date(publicationDate);
//   const todaysDate = new Date();

//   return publicationDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0);
// }