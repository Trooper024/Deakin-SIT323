var express = require("express") // Import the Express library
var app = express() // Create a new Express application

var port = process.env.port || 3000 // Set the port number for the application

app.listen(port, () => { // Start the application on the specified port
  console.log("App listening to: " + port) // Log a message to the console indicating that the application is running
})

