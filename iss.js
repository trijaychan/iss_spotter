const request = require("request");
const url = "https://api.ipify.org?format=json";

const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    let data = JSON.parse(body);
    let ip = data.ip;

    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, ip);
  });
};

module.exports = { fetchMyIP };