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

const atLarge = feature => {
  let str = JSON.stringify(feature.properties);
  let stateMatch = /("AK"|"DE"|"MT"|"ND"|"SD"|"VT"|"WY")/.exec(str);
  if(stateMatch) {
    let state = stateMatch[1];
    let district = 0;
    feature.properties = {state, district};
    return true;
  }
  else return false;
};

const objCleanup = obj => {
  let unclean = [];
  obj.features.forEach(feat => {
    if(!featCleanup(feat)) {
      if(!atLarge(feat)) unclean.push(feat);
    }
  });
  return unclean;

};


const FIPS = { '10': 'Delaware',
  '11': 'District of Columbia',
  '12': 'Florida',
  '13': 'Georgia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming',
  '72': 'Puerto Rico',
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut' };
