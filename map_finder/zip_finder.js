import { geocoder } from "./map_setup.js";

const retrieveDistrict = zip => (
    $.ajax({
      method: "GET",
      url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fcongress.api.sunlightfoundation.com%2Fdistricts%2Flocate%3Fzip%3D${zip}%22&format=json&diagnostics=true&callback=`,
      success: res => appendResults(res)
    })
  );

  const appendResults = res => {
    let jsonResults = res.query.results.json;
    let districtText;

    if(jsonResults.count === "1") {
      let result = jsonResults.results;
      districtText = $("<p class='district-text'></p>").text(`Your district is ${result.state}-${result.district}.`);
    } else if(jsonResults.count === "0") {
      districtText = $("<p></p>").text(`We couldn't find districts for that ZIP code. Please check your entry and try again.`);
    } else {
      let resultArr = jsonResults.results;
      districtText = $("<div></div>").html(`
        <p>Your ZIP code crosses multiple districts:</p>
      `);
      let districtList = $("<ul></ul>");
      resultArr.forEach(result => districtList.append(`<li>${result.state}-${result.district}</li>`));
      districtText.append(districtList);
      let mapReferenceText = $("<p></p>").text(`Click on your neighborhood on the map above to reveal your district.`);
      districtText.append(mapReferenceText);
    }

    $("#district-results").html(districtText);
  };

export default retrieveDistrict;
