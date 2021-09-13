const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const hbs = require('hbs')
const { RSA_PKCS1_OAEP_PADDING } = require('constants')
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDiretoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to  serve
app.use(express.static(publicDiretoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Mariam Boules'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Mariam Boules'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Mariam Boules',
        message: 'Contact us for help'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude ,latitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404-error',{
        title: "404",
        name: "Mariam Boules",
        message: "Help article not found"
    })
})

app.get('*', (req, res)=>{
    res.render('404-error',{
        title: "404",
        name: "Mariam Boules",
        message: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server up and running on port' + port)
})