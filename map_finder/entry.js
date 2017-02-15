import { initMap, geocode } from "./map_setup.js";
import retrieveDistrict from "./zip_finder.js";

window.initMap = initMap;



$( () => {
  initMap();
  $("form").submit((e) => {
      e.preventDefault();
      let zip = e.target.zip.value;
      geocode(String(zip));
      retrieveDistrict(zip);
    });
  });
