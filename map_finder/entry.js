import initMap from "./map_setup.js";
import retrieveDistrict from "./zip_finder.js";


$( () => {
  var initMap;
  $("form").submit((e) => {
      e.preventDefault();
      let zip = e.target.zip.value;
      // geocode(zip);
      retrieveDistrict(zip);
    });
  });
