const request = require("request");

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const { ip } = JSON.parse(body);

    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = "https://freegeoip.app/json/" + ip;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const output = JSON.parse(body).response;

    callback(null, output);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error1, ip) => {
    if (error1) {
      console.log("It didn't work!" , error);
      return;
    }

    fetchCoordsByIP(ip, (error2, coords) => {
      if (error2) {
        console.log("It didn't work!" , error);
        return;
      }

      fetchISSFlyOverTimes(coords, (error3, flyTimes) => {
        if (error3) {
          console.log("It didn't work!", error3);
          return;
        }

        callback(null, flyTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };