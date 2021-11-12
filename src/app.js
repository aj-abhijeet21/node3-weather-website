const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhijeet Jagtap'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhijeet Shyam Jagtap'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'NullPointerException',
        name: 'Abhijeet Shyam Jagtap',
        description: 'NullPointerException is a RuntimeException. In Java, a special null value can be assigned to an object reference. NullPointerException is thrown when program attempts to use an object reference that has the null value.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Plesae provide an address'
        });
    }


    geocode(req.query.address, (error, {longitude, lattitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(longitude, lattitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

  
});

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide search term'
//         });
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404-not-found', {
        title: '404',
        name: 'Abhijeet Shyam Jagtap',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404-not-found', {
        title: '404',
        name: 'Abhijeet Shyam Jagtap',
        errorMessage: 'Page not found'
    });
});
app.listen(3000, () => console.log('Server is up on port 3000'));