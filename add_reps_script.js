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
        } else {
          console.log(`${lat},${lng}`);
          console.log(result);
        }
        });
    }).catch(err => console.log(err));
};

const updateData = obj => {
  return new Promise((resolve, reject) => {
    obj.features.forEach( feat => fetchAndAdd(feat));
    setTimeout(function(){if(obj.features[344].properties["REP"]) resolve(obj);}, 30000);
  });
};

updateData(data).then( res => fs.writeFile("testing.json", JSON.stringify(res)));
