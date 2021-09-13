const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=35d2425869a462adcaed6db586730773&query='+latitude+',' + longitude  //+ '&units=f'
    request({url, json: true}, (error,{body})=>{
        if (error){
            callback('No Internet connection')
        }else if(body.error){
            callback('Cannot find location')
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }

    })
}

module.exports = forecast
