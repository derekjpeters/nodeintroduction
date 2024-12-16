const express = require('express');
const morgan = require ('morgan');
const app = express();
const PORT = 3000;

//Using Morgan Middleware Globally
/* Morgan is a logging middleware for HTTP request
Applying it globally will allow us to log every HTTP request made to the app */

app.use(morgan('dev')); //Log HTTP request globally with the app

//Apply at the Route level

const router = express.Router();
router.use(morgan('combined')); //Log details on HTTP requests only for this router and routes

router.get('/route-level', (req, res) => {
    res.send('Morgan middleware applied at the route level.');
});

app.use('/route', router);

//middleware at the end-point level
app.get('/endpoint-level', morgan('tiny'), (req, res) => {
    res.send('Morgan Middleware Applied at the endpoint level.')
});

//Create custom middleware using Morgan
morgan.token('custom-date', () => {
    return new Date().toISOString();
});

//use the custom token
const customMorgan = morgan(':method :url :res[content-length] - :response-time ms :custom-date');
app.use('/custom', customMorgan);

//Custom endpoint with custom Morgan middleware
app.get('/custom', (req, res) => {
    res.send('Custom Morgan Middleware with a Custom Date Token.');
});

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title> EXPRESS MIDDLEWARE EXAMPLE </title>
        </head>
        <body> 
            <h1>Express Middleware Examples</h1>
                <ul>
                    <li><a href="/route/route-level"> Route-Level Middleware</a></li>
                    <li><a href="/endpoint-level"> Endpoint-Level Middleware</a></li>
                    <li><a href="/custom"> Custom-Level Middleware</a></li>
                </ul>
                <script>
                //Example Fetch Request
                async function fetchData() {
                    const response = await fetch('/endpoint-level');
                    const data = await response.text();
                    console.log(data);
                }
                fetchData();
                </script>
            </body>
        </html>
    `)
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})