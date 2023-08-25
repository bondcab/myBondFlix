
//adding the express, morgan, file system and path packages
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');


//running the express package put in variable called app
const app = express();

//Appends the log.txt file 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));





//array of objects on top 10 James Bond films - title and director currently added
let jamesBondFilms = [
    {
        title: 'Goldfinger',
        director: 'Guy Hamilton'
    },
    {
        title: 'From Russia With Love',
        director: 'Terence Young'
    },
    {
        title: 'Dr.No',
        director: 'Terence Young'
    },
    {
        title: 'Casino Royale',
        director: 'Marti Campbell'
    },
    {
        title: 'Skyfall',
        director: 'Sam Mendes'
    },
    {
        title: 'Thunderball',
        director: 'Terence Young'
    },
    {
        title: 'No Time To Die',
        director: 'Cary Joji Fukunaga'
    },
    {
        title: 'The Spy Who Loved Me',
        director: 'Lewis Gilbert'
    },
    {
        title: '007 On Her Majesty\'s Secret Service',
        director: 'Peter Hunt'
    },
    {
        title: 'Goldeneye',
        director: 'Martin Campbell'
    }
]

//GET Requests

//returns the above object array as a JSON file
app.get('/movies', (req, res) => {
    res.json(jamesBondFilms)
});

app.get('/', (req, res) => {
    res.send('The names Bond, James Bond')
})


app.get('/documentation', (req, res) => {
    res.sendFile('documentation.html', {root: __dirname + '/public'});
});


//Automatically routes request for static files in the public folder
app.use(express.static('public'));


//listen for requests on port 8080
app.listen(8080, () => {
    console.log('App is listening on port 8080')
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something not working!')
})

