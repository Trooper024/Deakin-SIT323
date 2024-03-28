// Import the Express library
const express = require("express")

// Create a new Express application
const app = express()

// Define a function to add two numbers
const addTwoNumber = (n1, n2) => {
  return n1 + n2
}

// Define a route to add two numbers and return the result as JSON
app.get("/addTwoNumber", (req, res) => {
  // Parse the query parameters as integers
  const n1 = parseInt(req.query.n1)
  const n2 = parseInt(req.query.n2)

  // Call the addTwoNumber function to get the result
  const result = addTwoNumber(n1, n2)

  // Return the result as JSON with a 200 status code
  res.json({ statuscode: 200, data: result })
})

// Define a route to return a simple HTML page
app.get("/", (req, res) => {
  // Set the content type to HTML
  res.set('Content-Type', 'text/html')

  // Send an HTML response
  const n1 = "<html><body><H1>HELLO THERE </H1></body></html>"
  res.send(Buffer.from(n1))
})

// Log the result of adding 19 and 12
console.log(addTwoNumber(19, 12))

// Set the port number for the application
const port = 3040

// Start the application on the specified port
app.listen(port, () => {
  // Log a message to the console indicating that the application is running
  console.log("hello i'm listening to port " + port)
})