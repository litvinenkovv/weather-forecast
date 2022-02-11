

export default {
// When a new city is searched, we need first to get its coordinates using 
// "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key} ",
URL_GET_COORDINATES: "http://api.openweathermap.org/geo/1.0/direct?",
// and then for the hourly mode make a call to 
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,daily,alerts&appid={API key}",
URL_GET_HOURLY: "https://api.openweathermap.org/data/2.5/onecall?",
// , and for the daily mode 
// "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&appid={API key}"
URL_GET_DAILY: "https://api.openweathermap.org/data/2.5/onecall?",
//  and add it to a city table.
};