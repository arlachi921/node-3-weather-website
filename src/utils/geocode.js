// NOTE: '?' becomes '%3F'
const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?limit=1&access_token=pk.eyJ1IjoiYXJsYS1icmlhbmUiLCJhIjoiY2t1NHRpMHhrMXAzdzJ2cWdqdnA1cWx1byJ9.HhOmaNJuPKZypXzSaR0p_w";
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect to location services");
        } else if (response.body.features.length === 0) {
            callback("unable to find location", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = {
    geocode: geocode,
};
