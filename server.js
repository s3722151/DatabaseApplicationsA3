// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

// Initialize Express app and set port
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI from .env
const uri = process.env.MONGO_URI;

// Middleware for static files and JSON parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// MongoDB Client and Database Setup
let db;
async function connectToDb() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db('sample_airbnb'); // Specify your database name here
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDb();

// Function to convert price to string
function convertPrice(price) {
    if (price && price._bsontype === 'Decimal128') {
        return price.toString();
    }
    return price;
}

// Endpoint to get random listings
app.get('/api/listings/random', async (req, res) => {
    try {
        const listings = await db.collection('listingsAndReviews').aggregate([{ $sample: { size: 5 } }]).toArray();
        // Log to check if the listings are retrieved from server
        //console.log('Random Listings Fetched:', listings);
        const convertedListings = listings.map(listing => ({
            ...listing,
            price: convertPrice(listing.price),
        }));

        res.json(convertedListings);
    } catch (error) {
        console.error('Error fetching random listings:', error);
        res.status(500).json({ error: 'Error fetching random listings' });
    }
});

// Endpoint to search listings based on form input
app.post('/api/listings/search', async (req, res) => {
    const { location, propertyType, bedrooms } = req.body;
    const query = {
        // Dynamic Object - only properties with truthy values included in final object
        ...(location && {
            'address.market': { $regex: new RegExp(location, 'i') } // Case-insensitive match for address.market
        }),
        ...(propertyType && { property_type: propertyType }),
        ...(bedrooms && { bedrooms: parseInt(bedrooms, 10) }),
    };

    // Used to check what if input is equal to server
    // console.log('Received search query:', query); // Log the search query

    try {
        // Count total matching listings
        const totalCount = await db.collection('listingsAndReviews').countDocuments(query);

        const listings = await db.collection('listingsAndReviews').find(query).limit(10).toArray();
        // console.log('Listings retrieved from database:', listings); // Log the retrieved listings

        // Convert price before sending response
        //https://www.w3schools.com/jsref/jsref_map.asp
        const convertedListings = listings.map(listing => ({
            ...listing,
            price: convertPrice(listing.price),
        }));

        // Send back the listings and the total count
        res.json({ totalCount, listings: convertedListings });
    } catch (error) {
        console.error('Error searching for listings:', error);
        res.status(500).json({ error: 'Error searching for listings' });
    }
});

//Endpoint to handle booking submission
//INSERT EXPRESS ROUTE FOR BOOKINGS HERE
// Endpoint to handle booking submission
app.post('/api/bookings', async (req, res) => {
    const { listingId, booking } = req.body;

    try {
        await db.collection('listingsAndReviews').aggregate([
            { $match: { _id: listingId } },
            {
                $addFields: {
                    bookings: {
                        $cond: {
                            if: { $gt: [{ $size: { $ifNull: ["$bookings", []] } }, 0] },
                            then: "$bookings",
                            else: []
                        }
                    }
                }
            },
            {
                $set: {
                    bookings: {
                        $concatArrays: ["$bookings", [booking]]
                    }
                }
            },
            {
                $merge: {
                    into: "listingsAndReviews",
                    whenMatched: "replace",
                    whenNotMatched: "fail"
                }
            }
        ]).toArray();

        res.status(200).json({ message: 'Booking added successfully.' });
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: 'Error adding booking.' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
