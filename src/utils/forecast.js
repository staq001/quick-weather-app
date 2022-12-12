const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b704079d890fe74b595af304ad4487f1&query=${latitude},${longitude}&unit=c`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.success === false) {
      callback("Unable to find location. Try again", undefined);
    } else {
      const { temperature, weather_descriptions } = response.body.current;
      const { name, region } = response.body.location;
      callback(undefined, {
        temperature: temperature,
        weatherDescription: weather_descriptions,
        location: `${name}, ${region}`,
      });
    }
  });
};

module.exports = forecast;
