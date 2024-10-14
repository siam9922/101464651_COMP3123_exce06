const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const DB_URL = "mongodb+srv://siamhasan773:DvGpmt7kTXE9Iv1k@comp3123.wuqlg.mongodb.net/yourDatabaseName?retryWrites=true&w=majority"; 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// MongoDB connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB Atlas");
}).catch(err => {
    console.log('Could not connect to MongoDB. Exiting now...', err);
    process.exit();
});

// Import Note routes
const noteRoutes = require('./routes/NoteRoutes');
app.use(noteRoutes); // Register the routes

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Start server on port 8082
app.listen(8082, () => {
    console.log("Server is listening on port 8082");
});
