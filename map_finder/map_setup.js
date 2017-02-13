

  function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 37.0902, lng: -95.71}
    });
    const geocoder = new google.maps.Geocoder();


  map.data.loadGeoJson('https://raw.githubusercontent.com/madrev/sister_district_sandbox/master/reps_added.json');

  map.data.setStyle( feature => {
    let color = 'gray';
    if(feature.f["REP"]) {
      if(feature.f["REP"].party === "D") {
        color="blue";
      } else if(feature.f["REP"].party === "R"){
        color="red";
      }
    }
    return{
      fillColor: color,
      strokeWeight: 0.35
  };
  });

  const infowindow = new google.maps.InfoWindow;

  map.data.addListener('click', function(event) {
      console.log(event);
      infowindow.setPosition(event.latLng);
      infowindow.setContent(`${event.feature.f["STATE"]}, ${event.feature.f["CD115FP"]}`);
      infowindow.open(map);
    });
  }