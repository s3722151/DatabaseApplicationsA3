const { MongoClient } = require('mongodb');
const http = require('http'); //We do this as node files must be initiated on server before having any effect: https://www.w3schools.com/nodejs/nodejs_http.asp
const fs = require('fs'); //https://www.w3schools.com/nodejs/nodejs_filesystem.asp
const path = require('path');

// MongoDB connection URI
const uri = 'mongodb+srv://s3722151:Gatesea3@assignment3cluster.kbysd.mongodb.net/';
const client = new MongoClient(uri);

// Create an HTTP server
//https://www.w3schools.com/nodejs/nodejs_http.asp
const server = http.createServer(async (req, res) => {
    console.log(`Received request for: ${req.url}`);

    // Serve static files from the public directory
    if (req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    } else if (req.url === '/') {
        serveFile(res, 'public/index.html', 'text/html');
    } else if (req.url === '/random-listings') {
        try {
            await client.connect();//First connect to the connection string
            const database = client.db('sample_airbnb'); //Connect to the database
            const collection = database.collection('listingsAndReviews');//Connect to the collection

            //This is the randomise function. 
            const randomListings = await collection.aggregate([
                { $sample: { size: 3 } },
                { $project: { name: 1, summary: 1, price: 1, "review_scores.review_scores_rating": 1 } }
            ]).toArray();

            //There was an issue here. $Object $Object
            randomListings.forEach(listing => {
                if (listing.price && listing.price._bsontype === 'Decimal128') {
                    listing.price = listing.price.toString(); // Convert Decimal128 to string
                    console.log('Converted price:', listing.price); // Check if conversion happens
                }
            });            
            console.log('Fetched random listings:', randomListings);

                       
            //To convert cursor into a array of documents  NOT store data in a array
            console.log('Fetched random listings:', randomListings);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(randomListings));
        } catch (error) {
            console.error('Error fetching random listings:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching random listings');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Function to serve files
function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading the file');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Start the server - calls upon const server. Specifying port
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
