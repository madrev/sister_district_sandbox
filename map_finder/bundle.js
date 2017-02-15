/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: 37.0902, lng: -95.71 }
  });
  var geocoder = new google.maps.Geocoder();

  map.data.loadGeoJson('https://raw.githubusercontent.com/madrev/sister_district_sandbox/master/reps_added.json');

  map.data.setStyle(function (feature) {
    var color = 'gray';
    if (feature.f["REP"]) {
      if (feature.f["REP"].party === "D") {
        color = "blue";
      } else if (feature.f["REP"].party === "R") {
        color = "red";
      }
    }
    return {
      fillColor: color,
      strokeWeight: 0.35
    };
  });

  var infowindow = new google.maps.InfoWindow();

  map.data.addListener('click', function (event) {
    infowindow.setPosition(event.latLng);
    infowindow.setContent(event.feature.f["STATE"] + ', ' + event.feature.f["CD115FP"]);
    infowindow.open(map);
  });
}

window.initMap = initMap;

exports.default = initMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var retrieveDistrict = function retrieveDistrict(zip) {
  return $.ajax({
    method: "GET",
    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fcongress.api.sunlightfoundation.com%2Fdistricts%2Flocate%3Fzip%3D" + zip + "%22&format=json&diagnostics=true&callback=",
    success: function success(res) {
      return appendResults(res);
    }
  });
};

// const geocode = zip => {
//   geocoder.geocode({'address': zip}, res => console.log(res));
// };

var appendResults = function appendResults(res) {
  var jsonResults = res.query.results.json;
  var districtText = void 0;

  if (jsonResults.count === "1") {
    var result = jsonResults.results;
    districtText = $("<p class='district-text'></p>").text("Your district is " + result.state + "-" + result.district + ".");
  } else if (jsonResults.count === "0") {
    districtText = $("<p></p>").text("We couldn't find districts for that ZIP code. Please check your entry and try again.");
  } else {
    var resultArr = jsonResults.results;
    districtText = $("<div></div>").html("\n        <p>Your ZIP code crosses multiple districts:</p>\n      ");
    var districtList = $("<ul></ul>");
    resultArr.forEach(function (result) {
      return districtList.append("<li>" + result.state + "-" + result.district + "</li>");
    });
    districtText.append(districtList);
  }

  $("#district-results").html(districtText);
};

exports.default = retrieveDistrict;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map_setup = __webpack_require__(0);

var _map_setup2 = _interopRequireDefault(_map_setup);

var _zip_finder = __webpack_require__(1);

var _zip_finder2 = _interopRequireDefault(_zip_finder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  var initMap;
  $("form").submit(function (e) {
    e.preventDefault();
    var zip = e.target.zip.value;
    // geocode(zip);
    (0, _zip_finder2.default)(zip);
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map