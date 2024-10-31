document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display random listings on page load
    fetchRandomListings();

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const location = document.getElementById('location').value;
        const propertyType = document.getElementById('propertyType').value;
        const bedrooms = document.getElementById('bedrooms').value;

        // Send the search request to the server
        const response = await fetch('/api/listings/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location, propertyType, bedrooms }),
        });

        //Ddebugging - check what a user enter
        //console.log('Response from server:', response);

        // Check if the response is OK
        if (response.ok) {
            const { totalCount, listings } = await response.json();
            // console.log('Listings retrieved:', listings); // Log retrieved listings
            renderListings(listings, totalCount);
            console.log(`Total listings found: ${totalCount}`); // Display total count in console
        } else {
            console.error('Error fetching listings:', response.statusText);
        }
    });
});

// Fetch random listings function
async function fetchRandomListings() {
    const response = await fetch('/api/listings/random');
    const listings = await response.json();
    renderListings(listings, listings.length, true); // Optionally display random listings
}

// Render listings function
function renderListings(listings, totalCount, isRandom = false) {
    const listingEntered = document.getElementById('listingEntered');
    listingEntered.innerHTML = ''; // Clear previous results

    if (listings.length === 0) {
        listingEntered.innerHTML = '<p>No listings found.</p>';
        return;
    }

    const listingCount = isRandom
        ? 'Random Listings'
        : `${totalCount} listings match your preferences`; // Use totalCount for accurate display
    listingEntered.innerHTML += `<h2>${listingCount}</h2>`;

    listings.forEach(listing => {
        //destructuring assignment  - get values from listing
        const { _id, name, summary, price, review_scores } = listing;

        const listingHtml = `
        <div="listing-container">
            <a href="#" class="listing-link" data-listing='${JSON.stringify({ name, summary, price, review_scores, _id })}'>${name}</a>
            <p>${summary}</p>
            <p>Daily Rate: $${price || 'N/A'}</p>
            <p>Customer Rating: ${review_scores?.review_scores_rating || 'N/A'}</p>
            <p>Listing ID: ${_id}</p> <!-- Display _id here for verification -->
        </div>
        `;

        listingEntered.innerHTML += listingHtml;
    });



    // Add event listener for the listing links
    document.querySelectorAll('.listing-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const listingData = JSON.parse(event.target.getAttribute('data-listing'));
            // Store the listing data temporarily
            sessionStorage.setItem('selectedListing', JSON.stringify(listingData));
            //Check the data structure.
            console.log('Stored Listing Data:', listingData);
            // Redirect to bookings.html
            window.location.href = 'bookings.html';
        });
    });
}


// Function to convert price to string
function convertPriceToString(price) {
    // Check if price is a BSON Decimal128 type
    if (price && price.constructor && price.constructor.name === 'Decimal128') {
        return price.toString(); // Convert it to a string
    }
    // If it's already a number or another type, handle accordingly
    return price ? `$${price}` : 'N/A';
}

