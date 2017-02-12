const data = require('./simplified_tiger.json');
const fetch = require('node-fetch');
const fs = require('fs');


const fetchAndAdd = (feature) => {
  let lat = feature.properties["INTPTLAT"];
  let lng = feature.properties["INTPTLON"];
  let url = `http://congress.api.sunlightfoundation.com/legislators/locate?latitude=${lat}&longitude=${lng}`;
  fetch(url)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        json.results.forEach(result => {
          if(result.chamber === "house") {
          feature.properties["REP"] = result;
          console.log(feature.properties);
        }
        });
    });
};

data.features.forEach(feature => fetchAndAdd(feature));


fs.writeFile('reps_added.json', JSON.stringify(data));
