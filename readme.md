Node.js and Express.js Project: Introduction to APIs
----------------------------------------------------

Welcome to the **Node.js and Express.js Introduction**! This guide will help you set up, run, and explore the project's functionality.

* * * * *

### **Project Overview**

This project demonstrates:

-   Setting up a Node.js server using Express.
-   Defining routes to handle HTTP requests.
-   Sending JSON responses to mimic API behavior.

* * * * *

### **Prerequisites**

Ensure you have the following installed on your system:

1.  **Node.js** (Download from [Node.js Official Website](https://nodejs.org/)).
2.  **NPM** (Included with Node.js installation).
3.  A text editor like **VS Code**.

* * * * *

### **Setup Instructions**

#### Clone the Repository

bash

Copy code

`git clone https://github.com/derekjpeters/nodeintroduction.git
cd nodeintroduction`

#### Install Dependencies

bash

Copy code

`npm install`

* * * * *

### **Running the Project**

#### Start the Server

bash

Copy code

`node server.js`

#### Access the Application

Open your browser or an API testing tool (like Postman) and test the following routes:

| **Route** | **HTTP Method** | **Description** |
| --- | --- | --- |
| `/api/students` | GET | Returns a list of students in JSON format. |
| `/api/courses` | GET | Returns a list of available courses. |
| `/api/greet/:name` | GET | Greets the user with the provided name. |
| Undefined Route Example | Any | Returns a 404 message. |

* * * * *

### **Routes and Functionality**

#### 1\. **Students Route**

-   **Path**: `/api/students`
-   **Method**: GET
-   **Description**: Returns a list of students, each with an ID, name, course, and grade.

**Code**:

javascript

Copy code

`app.get('/api/students', (req, res) => {
    const students = [
        { id: 1, name: 'John Doe', course: 'JavaScript', grade: 'A' },
        { id: 2, name: 'Jane Smith', course: 'Node.js', grade: 'A' },
        { id: 3, name: 'Derek Peters', course: 'Express JS', grade: 'B' }
    ];
    res.status(200).json(students);
});`

* * * * *

#### 2\. **Courses Route**

-   **Path**: `/api/courses`
-   **Method**: GET
-   **Description**: Returns a list of available courses.

**Code**:

javascript

Copy code

`app.get('/api/courses', (req, res) => {
    const courses = ['JavaScript Basics', 'Node.js Essentials', 'Express is Awesome'];
    res.json(courses);
});`

* * * * *

#### 3\. **Greet Route**

-   **Path**: `/api/greet/:name`
-   **Method**: GET
-   **Description**: Greets the user with the provided name in the URL parameter.

**Code**:

javascript

Copy code

`app.get('/api/greet/:name', (req, res) => {
    try {
        const name = req.params.name;
        if (!name) {
            res.status(400).send('Name parameter is missing');
        } else {
            res.send(`Hello, ${name}`);
        }
    } catch (error) {
        console.log('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});`

* * * * *

#### 4\. **404 Route**

-   **Path**: Undefined routes
-   **Method**: Any
-   **Description**: Handles any undefined routes and returns a 404 status with a message.

**Code**:

javascript

Copy code

`app.use((req, res) => {
    res.status(404).send('Route not Found');
});`

* * * * *

### **Error Handling**

#### Common Errors and Fixes:

1.  **Server Not Running**: Ensure you run `node server.js` in the project directory.
2.  **Route Not Found**: Verify the URL matches the route definition exactly.
3.  **Port Already in Use**: Change the port in `server.js` if port 3000 is occupied.

* * * * *

### **Testing the API**

#### Using Browser

Visit:

-   `http://localhost:3000/api/students`
-   `http://localhost:3000/api/courses`
-   `http://localhost:3000/api/greet/YourName`

#### Using Postman

1.  Open Postman and create a new request.
2.  Set the method to **GET**.
3.  Enter the URL (e.g., `http://localhost:3000/api/students`) and click "Send".
4.  View the response in the Postman interface.

#### Using `curl` (Optional)

bash

Copy code

`curl http://localhost:3000/api/students`

* * * * *

### **Future Enhancements**

-   Add POST, PUT, and DELETE methods for handling data modifications.
-   Connect to a database (e.g., MongoDB) to make the API dynamic.
-   Add authentication and middleware.

* * * * *

### **Conclusion**

Congratulations! 🎉 You've successfully set up and run a Node.js and Express.js application with basic API functionality. Use this project as a foundation to build more complex and dynamic applications.