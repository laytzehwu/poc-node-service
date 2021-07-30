
const WeatherService = require('./weather-service');

const weatherService = new WeatherService();

exports.WeatherService = WeatherService;
exports.weatherService = weatherService;
