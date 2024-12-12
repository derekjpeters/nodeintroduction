const express  = require('express'); //This imports the express framework
const fs = require('fs')// File system module

const app = express(); //create our express application framework
app.use(express.json()); //Middleware to parse JSON request bodies

let pizzas = JSON.parse(fs.readFileSync('./data/pizzas.json','utf-8'));

//Create router for pizza-related routes
const pizzaRouter = express.Router();

//POST ROUTE: Add a new pizza
pizzaRouter.post('/', (req, res) => {
    const pizza = req.body; //Extract new pizza data from the req body
    pizzas.push(pizza); //Add a new pizza to the array
    res.status(201).send(pizza);//Send back the new pizza with a 201 status
});

//GET ROUTE: Retrieve all the pizzas
pizzaRouter.get('/', (req, res) => {
    res.send(pizzas); //Send the full pizzas array to the user that calls the route
})

//GET ROUTE: Retrieve pizzas by ID
pizzaRouter.get('/:id', (req, res) => {
    const pizza = pizzas.find(p => p.id === parseInt(req.params.id)); //Find the pizza by id 
    if(!pizza) return res.status(404).send('Pizza not found');
    res.send(pizza);
});

//PUT ROUTE: Update the pizza by ID
pizzaRouter.put('/:id', (req, res) => {
    const pizza = pizzas.find(p => p.id === parseInt(req.params.id));
    if (!pizza) return res.status(404).send('Pizza not found');

    pizza.name = req.body.name; //Update the name from the request body
    pizza.toppings = req.body.toppings; //update the toppings
    res.send(pizza); //Send back the updated information
});

//DELETE ROUTE: Remove the pizza by ID
pizzaRouter.delete('/:id', (req, res) => {
    const pizzaIndex = pizzas.findIndex(p => p.id === parseInt(req.params.id))
    if (pizzaIndex === -1) return res.status(404).send('pizza not found');

    const deletedPizza = pizzas.splice(pizzaIndex, 1);
    res.send(deletedPizza);
});

//Use the pizza router for all /pizzas routes
app.use('/pizzas', pizzaRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));