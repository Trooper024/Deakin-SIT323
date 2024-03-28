// const express = require("express");
// // Importing the response object from Express
// const res = require("express/lib/response");

// const app = express();

// const add = (n1, n2) => {
//   return n1 + n2;
// };

// // Define an endpoint that accepts a GET request at /add
// app.get("/add", (req, res) => {
//   try {
//     // Parse the query parameters n1 and n2 as floating-point numbers
//     const n1 = parseFloat(req.query.n1);
//     const n2 = parseFloat(req.query.n2);

//     // Check if the values of n1 and n2 are valid numbers
//     if (isNaN(n1)) {
//       throw new Error("n1 incorrectly defined");
//     }
//     if (isNaN(n2)) {
//       throw new Error("n2 incorrectly defined");
//     }

//     // Calculate the sum of n1 and n2
//     const result = add(n1, n2);

//     // Return the result as a JSON object with a 200 status code
//     res.status(200).json({ statuscocde: 200, data: result });
//   } catch (error) {
//     // Log the error to the console
//     console.log(error);

//     // Return a JSON object with a 500 status code and an error message
//     res.status(500).json({
//       statuscocde: 500,
//       msg: error.toString(),
//     });
//   }
// });

// const port = 3040;

// // Start the server and listen on port 3040
// app.listen(port, () => {
//   console.log("hello I'm listening to port" + port);
// });

// Import express library
const express = require("express");

// Import winston logger
const winston = require('winston');

// Import the express response object
// const res = require("express/lib/response");

// Create a new express app
const app = express();

// Import file system
const fs = require('fs');

// Create a new logger using Winston
const logger = winston.createLogger({
  level: 'info',           // Set the log level to 'info'
  format: winston.format.json(),   // Format the logs as JSON
  defaultMeta: { service: 'calculate-service' },
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If we're not in production then log to the `console`
// with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Define an 'add' function
const add = (n1, n2) => {
  return n1 + n2;
};

// Define a GET route for '/add'
app.get("/add", (req, res)=>{
  try {
    // Parse n1 and n2 from the query string
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    // Check if n1 or n2 is NaN
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    // Log the received parameters
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');

    // Calculate the sum
    const result = add(n1, n2);

    // Send the result as JSON
    res.status(200).json({ statuscocde: 200, data: result });
  } catch(error) {
    console.error(error);
    // Send the error as JSON
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

// Define the port
const port = 3040;

// Start the server
app.listen(port, ()=> {
  console.log("hello i'm listening to port" + port);
});