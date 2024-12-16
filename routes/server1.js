console.log("Node.js is running");
//Import the Express Library
const express = require("express");
//import body parser to process the request through express
const bodyParser = require('body-parser');
//Create an instance of the Expess Application
const app = express();
const PORT = 3000;

//Parsing for Middleware
app.use(bodyParser.json());

//Sample Data
let hobbits = [
	{id: 1, name: "Frodo", age: 30},
	{id: 2, name: "Samwise", age: 27}
];

app.get('/hobbits', (req,res) => {
	res.json(hobbits);
})

app.post('/hobbits', (req, res) => {
	let newHobbit = {
		id: hobbits.length + 1,
		name: req.body.name,
		age: req.body.age,
	};
	hobbits.push(newHobbit);
	res.status(201).json(newHobbit);
})

app.put('/hobbits/:id', (req, res) => {
	//Extract the id parameter from the request url - convert to an integer
	const id = parseInt(req.params.id);

	//find the hobbit with the matching id
	const hobbit = hobbits.find(h => h.id === id);

	//something if no id is found, we will want to send a 404 request with an error message
	if (!hobbit) {
		return res.status(404).json({error: "Hobbit not found"});
	}

	//Update the name
	//If no new provided, keep the existing name
	hobbit.name = req.body.name || hobbit.name;

	//Update the age
	//If no new age is provided, keep the existing age
	hobbit.age = req.body.age || hobbit.age;

	//third thing to keep in mind is you have to send the updated hobbit to the server as a JSON response
	res.json(hobbit);
});

app.delete('/hobbits/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const hobbitIndex = hobbits.findIndex(h => h.id === id);

	if(hobbitIndex === -1) {
		return res.status(404).json({error: "Hobbit not found"});
	}
	//Logic to delet hobbit record from server
	const deletedHobbit = hobbits.splice(hobbitIndex, 1);
	res.json(deletedHobbit);
})

//Define a route for the root URL
//When a get request is made to the root URL, the callback function is executed
//'req' (short request) contain the information about the incoming HTTP request
//'res' (short for response) is used to send a response back to the client
app.get("/", (req, res) => {
	res.send("Hello, Express!!");
});



app.get("/api/students", (req, res) => {
	const students = [
		{ id: 1, name: "John Doe", course: "JavaScript", grade: "A" },
		{ id: 2, name: "Jane Smith", course: "Node.js", grade: "A" },
		{ id: 3, name: "Derek Peters", course: "Express JS", grade: "B" },
	];
	res.status(200).json(students);
});

app.get("/api/courses", (req, res) => {
	const courses = [
		"JavaScript Basics",
		"Node.js Essentials",
		"Express is Awesome",
	];
	res.json(courses);
});

app.get("/api/greet/:name", (req, res) => {
	try {
		const name = req.params.name;
		if (!name) {
			res.status(400).send("Name parameter is getting an error");
		} else {
			res.send(`Hello, ${name}`);
		}
	} catch (error) {
		console.log("Error occurred:", error);
		res.status(500).send("Internal Server Error");
	}
});

// app.use((req, res) => {
// 	res.status(404).send("Route not Found");
// });

//Start the server and make it Listen for incoming request on port 3000
//Callback function runs once the serer starts
app.listen(PORT, () => {
	//Log a message to the console to indicate that the server is running
	console.log(`Server is running on http://localhost:${PORT}`);
});
