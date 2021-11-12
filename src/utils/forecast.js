const request = require('request');

const forecast = (longitude, lattitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=532631bf06f794eeeb83590b4af4d92d&query=${lattitude},${longitude}&units=m`;

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unabe to connect to weather service!', undefined);
        } else if(body.error){
            callback('Unable to find location!', undefined);
        }   else{
            // console.log(url);
            const result = `${body.current.weather_descriptions[0]} \nIt it currently ${body.current.temperature} degrees out in ${body.location.name}. \nThere is a ${body.current.precip}% chance of rain.`;
            callback(undefined, result);
        }
    });
};

module.exports = forecast;
