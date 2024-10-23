const { MongoClient } = require('mongodb');
const http = require('http');
const fs = require('fs');
const path = require('path');

// MongoDB connection URI
const uri = 'mongodb+srv://s3722151:Gatesea3@assignment3cluster.kbysd.mongodb.net/';
const client = new MongoClient(uri);

// Create an HTTP server
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
            await client.connect();
            const database = client.db('sample_airbnb');
            const collection = database.collection('listingsAndReviews');
            const randomListings = await collection.aggregate([
                { $sample: { size: 5 } },
                { $project: { name: 1, summary: 1, price: 1, "review_scores.review_scores_rating": 1 } }
            ]).toArray();
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

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
