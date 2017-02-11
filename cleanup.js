const featCleanup = (feature) => {
  let str = JSON.stringify(feature.properties);
  let stateMatch = /state:(..)/.exec(str) || /"([A-Z]{2})"/.exec(str);
  let distMatch = /cd:(\d\d?)/.exec(str) || /(\d\d?)(th|nd|st|rd)/.exec(str);
  if(stateMatch && distMatch) {
  let state = stateMatch[1].toUpperCase();
  let district = distMatch[1];
  feature.properties = {state, district};
  return true;
  }
  else return false;
};

const objCleanup = obj => {
  let unclean = [];
  obj.features.forEach(feat => {
    if(!featCleanup(feat)) unclean.push(feat);
  });
  return unclean;

};
