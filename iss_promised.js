const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  const url = "https://freegeoip.app/json/" + JSON.parse(body).ip;
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .catch((error) => {
      console.log("It didn't work:", error.message);
    })
    .then(fetchISSFlyOverTimes)
    .catch((error) => {
      console.log("It didn't work:", error.message);
    })
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log("It didn't work:", error.message);
    });
};

module.exports = {
  nextISSTimesForMyLocation
};