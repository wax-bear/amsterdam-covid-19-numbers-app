const fetch = require('node-fetch');

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
