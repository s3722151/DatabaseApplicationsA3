const { MongoClient } = require('mongodb');
const http = require('http'); // For creating the HTTP server
const fs = require('fs'); // For file system operations
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
    }
    // Route for fetching random listings
    else if (req.url === '/random-listings') {
        try {
            await client.connect(); // First connect to the connection string
            const database = client.db('sample_airbnb'); // Connect to the database
            const collection = database.collection('listingsAndReviews'); // Connect to the collection

            // 1. Get the total count of listings (e.g., all listings, or add filters if needed)
            const totalListingsCount = await collection.countDocuments();

            // 2. Fetch random listings with a $sample size of 3
            const randomListings = await collection.aggregate([
                { $sample: { size: 3 } },
                { $project: { name: 1, summary: 1, price: 1, "review_scores.review_scores_rating": 1 } }
            ]).toArray();

            //console.log('Way to check if random listings are retrieved:', randomListings);

            // Convert Decimal128 to string for price
            randomListings.forEach(listing => {
                if (listing.price && listing.price._bsontype === 'Decimal128') {
                    listing.price = listing.price.toString(); // Convert Decimal128 to string
                    console.log('The object converted to string price is:', listing.price); // Check if conversion happens
                }
            });

            // 3. Send both random listings and the total listings count
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ listings: randomListings, totalCount: totalListingsCount }));
        } catch (error) {
            console.error('Error fetching random listings:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching random listings');
        }
    }
    // Route for searching listings based on filters
    else if (req.url === '/search-listings' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            try {
                const query = JSON.parse(body); // Parse the JSON body into an object
                await client.connect(); // Ensure the client is connected
                const database = client.db('sample_airbnb'); // Connect to the database
                const collection = database.collection('listingsAndReviews'); // Connect to the collection

                // Query the database based on the provided filters
                const listings = await collection.find(query).project({ name: 1, summary: 1, price: 1, "review_scores.review_scores_rating": 1 }).toArray();

                // Convert Decimal128 to string for price
                listings.forEach(listing => {
                    if (listing.price && listing.price._bsontype === 'Decimal128') {
                        listing.price = listing.price.toString(); // Convert Decimal128 to string
                    }
                });

                // Way to check if the listings are retrieved
                //console.log('Fetched search listings:', listings);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(listings));
            } catch (error) {
                console.error('Error fetching search listings:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error fetching search listings');
            }
        });
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
