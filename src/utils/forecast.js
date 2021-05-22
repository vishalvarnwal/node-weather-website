const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

//'http://api.weatherstack.com/current?access_key=ea14e429e38d3ff56476a5dd2897d202&query=24.467699,85.595200&units=f'

const forecast = (latitude, longitude, callback) => {
    const cordinates = latitude +','+longitude
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=ea14e429e38d3ff56476a5dd2897d202&query='+cordinates+'&units=f'
    //console.log(weatherUrl)

    request({ url: weatherUrl, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect with weather services!', undefined)
        }else if(body.error){
            callback('Unable to find the location. Please try with another search!', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+". it is currnetly " + 
            body.current.temperature + " degree Fahrenheit in record but it feels like " + body.current.feelslike + " degree Fahrenheit out")
        }
    })
    
}

module.exports = forecast