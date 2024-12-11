const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
//API documentation: https://swapi.dev/documentation
const PORT = 3000; //Port Number

app.use(bodyParser.json()); //Auto parse incoming JSON payloads
//Utility function to read JSON files
const readJSONFile = (filename) => {
    const filepath = path.join(__dirname, 'data', filename); //Constructs the filepath
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

//Base Route
app.get('/', (req, res) => {
    res.send('Welcome to the Star Wars API!') //Send a welcome message
})
//Route for starships local
app.get('/ships', (req,res) => {
    const ships = readJSONFile('ships.json');
    res.json(ships); 
})

//Route for starships SWAPI
app.get('/swapi/starships', async (req, res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/starships');
        res.json(response.data.results); //Send the starship data as JSON
    } catch (error) {
        res.status(500).send('Error fetching data from SWAPI'); //Error handling
    }
})
app.get('/swapi/people', async (req, res)=> { 
    try {
        const response = await axios.get('https://swapi.dev/api/people');
        res.json(response.data.results); 
    } catch (error) {
        res.status(500).send('Error fetching data from SWAPI');
    }
})
app.get('/swapi/people/:id', async (req, res) => {
    const { id } = req.params; //Extract the charID from the route parameters
    try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        res.json(response.data); 
    } catch (error) {
        res.status(500).send('Error fetching data from SWAPI'); 
    }
});

//Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`); //Logs the server start
})