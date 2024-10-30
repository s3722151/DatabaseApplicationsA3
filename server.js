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
            $expr: { $eq: [{ $strcasecmp: ['$name', location] }, 0] } // Case-insensitive exact match for name
        }),
        ...(propertyType && { property_type: propertyType }),
        ...(bedrooms && { bedrooms: parseInt(bedrooms, 10) }),
    };

    // Used to check what if input is equal to server
    // console.log('Received search query:', query); // Log the search query

    try {
        const listings = await db.collection('listingsAndReviews').find(query).limit(10).toArray();
        // console.log('Listings retrieved from database:', listings); // Log the retrieved listings

        // Convert price before sending response
        //https://www.w3schools.com/jsref/jsref_map.asp
        const convertedListings = listings.map(listing => ({
            ...listing,
            price: convertPrice(listing.price),
        }));
        res.json(convertedListings);
    } catch (error) {
        console.error('Error searching for listings:', error);
        res.status(500).json({ error: 'Error searching for listings' });
    }
});

//Endpoint to handle booking submission
//INSERT EXPRESS ROUTE FOR BOOKINGS HERE
// Endpoint to handle booking submission
app.post('/api/bookings', async (req, res) => {
    try {
        // Destructure fields from request body
        const {
            listingId, // The ID of the listing being booked
            guestName, // Name of the guest
            checkInDate, // Check-in date
            checkOutDate, // Check-out date
            numberOfGuests, // Total number of guests
            specialRequests // Any special requests from the guest
        } = req.body;

        // Validate that listingId is present
        if (!listingId) {
            return res.status(400).json({ error: 'Listing ID is required' });
        }

        // Create booking data object
        const bookingData = {
            guestName,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            specialRequests,
            createdAt: new Date() // Timestamp when the booking was made
        };

        // Update the listingsAndReviews collection by pushing booking data to the bookings array
        const result = await db.collection('listingsAndReviews').updateOne(
            { _id: ObjectId(listingId) }, // Use the provided listingId
            { $push: { bookings: bookingData } } // Push booking data to the bookings array
        );

        // Check if the listing was found and updated
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Listing not found or booking not added' });
        }

        // Send response with the inserted booking details
        res.status(201).json({
            message: 'Booking created successfully',
            bookingData: bookingData,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
