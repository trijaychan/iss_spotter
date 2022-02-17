const { fetchMyIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error fetch:", error);
    return;
  }

  console.log("Returned IP:", ip);
});