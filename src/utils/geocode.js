const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyaWFtYm91bGVzIiwiYSI6ImNrbnl6MXo0azAwcmUydm1mM2U4am0zNDYifQ.3aw7kEkamzrLruZ_5etqNQ&limit=1les.json?access_token=pk.eyJ1IjoibWFyaWFtYm91bGVzIiwiYSI6ImNrbnl6MXo0azAwcmUydm1mM2U4am0zNDYifQ.3aw7kEkamzrLruZ_5etqNQ&limit=1'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('No Internet Connection', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location.')
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode