const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    listingId: String,
    clientName: String,
    email: String,
    phone: String,
    startDate: Date,
    endDate: Date,
    postalAddress: String,
    homeAddress: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
