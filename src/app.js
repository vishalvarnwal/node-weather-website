const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()    //storing the express application in the const app

//Define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')               //taking 2 argument , first default engine name and 2nd file extension
app.set('views', viewPath)                  //to set the custom directory for hbs file earlier default dir was "web-server/views"
hbs.registerPartials(partialPath)           //tp serving up partial files 

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vishal Kumar'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: "Vishal Kumar"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpText: "this is help page",
        name: "Vishal Kumar"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide an address"
        })
    }
     geocode(address, (error, { latitude, longitude, placeName } = {} )=>{
         if(error){
             return res.send({ error })
         }

         forecast(latitude, longitude, (error, forecastData)=>{
             if(error){
                 return res.send({ error })
             }

             res.send({
                 forecast: forecastData,
                 placeName,
                 address
             })
         })
     })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404!',
        error: "Help article not found!",
        name: 'Vishal Kumar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        error: "Page not found!",
        name: 'Vishal Kumar'
    })
})

//for listening the response on the browser
app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})
