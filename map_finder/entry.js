import { initMap } from "./map_setup.js";
import retrieveDistrict from "./zip_finder.js";

window.initMap = initMap;

const geocoder = new google.maps.Geocoder();

const geocode = zip => {
  geocoder.geocode({'address': zip}, res => console.log(res[0].geometry.location.lat()));
};


$( () => {
  initMap();
  $("form").submit((e) => {
      e.preventDefault();
      let zip = e.target.zip.value;
      geocode(String(zip));
      retrieveDistrict(zip);
    });
  });
