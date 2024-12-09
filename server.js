console.log("Node.js is running");
//Import the Express Library
const express = require("express");
//Create an instance of the Expess Application
const app = express();

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

app.use((req, res) => {
	res.status(404).send("Route not Found");
});

//Start the server and make it Listen for incoming request on port 3000
//Callback function runs once the serer starts
app.listen(3000, () => {
	//Log a message to the console to indicate that the server is running
	console.log("Server is running on http://localhost:3000");
});
