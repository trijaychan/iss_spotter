const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log("Returned IP:", ip);
});

fetchCoordsByIP("66.183.88.179", (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log("Returned Coordinates:", data);
});