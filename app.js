/* 
What this file is:
    The main file where everything starts. 
    It sets up the server and connects all parts of the application.
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://s3722151:<db_password>@assignment3cluster.kbysd.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Set routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
