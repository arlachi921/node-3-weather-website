const request = require("postman-request");
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, latitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=f92f4ba3af67b53fcae30038323ffb39&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect to service");
        } else if (response.body.error) {
            callback("unable to find data");
        } else {
            //   callback(undefined, {
            //     country: response.body.location.country,
            //     region: response.body.region,
            //     weather: response.body.current.weather_descriptions[0],
            //   });
            callback(
                undefined,
                `It is currently ${response.body.current.temperature} degrees out and it feels like ${response.body.current.feelslike} degrees out. There is a ${response.body.current.precip}% chance of rain and has a ${response.body.current.weather_descriptions[0]} weather.`
            );
        }
    });
};

module.exports = {
    forecast: forecast,
};
