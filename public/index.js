// Function to fetch and display random listings
async function fetchRandomListings() {
    try {
        const response = await fetch('/random-listings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { listings } = await response.json(); // Adjusted destructuring if totalCount is not needed
        displayListings(listings); // Display random listings

    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Function to display listings in the bottom section
function displayListings(listings) {
    const bottomSection = document.getElementById('bottomSection'); // Target the bottom section

    // Clear existing content
    bottomSection.innerHTML = '';

    listings.forEach(listing => {
        // Create a div for each listing
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing';

        // Create the hyperlink
        const listingLink = document.createElement('a');
        listingLink.href = `bookings.html?listing_id=${listing._id}`; // URL with listing ID
        listingLink.innerText = listing.name; // Listing name as hyperlink
        listingLink.className = 'active'; // Add class for active styling

        // Create listing summary
        const summary = document.createElement('p');
        summary.innerText = `Summary: ${listing.summary || 'No summary available'}`; // Summary text

        // Create price and rating elements
        const price = document.createElement('p');
        const priceValue = listing.price ? listing.price.toString() : 'N/A';
        price.innerText = `Price: $${priceValue}`; // Price display

        const rating = document.createElement('p');
        rating.innerText = `Customer Rating: ${listing.review_scores?.review_scores_rating || 'N/A'}`; // Rating text

        // Append elements to listing div
        listingDiv.appendChild(listingLink);
        listingDiv.appendChild(summary);
        listingDiv.appendChild(price);
        listingDiv.appendChild(rating);

        // Append listing div to bottom section
        bottomSection.appendChild(listingDiv);
    });
}

// Call the fetchRandomListings function when the page loads
window.onload = fetchRandomListings;

/* ----------------- PART 2: User Validation ----------------------------------------------------------------------------------------------- */
async function userValidation() {
    // Step 1: Get values from user input
    const location = document.getElementById('location').value.trim();
    const propertyType = document.querySelector('select[name="propertyType"]').value || null; // Allow null if unselected
    const bedrooms = document.querySelector('select[name="bedrooms"]').value || null; // Allow null if unselected

    // Ensure location is provided
    if (!location) {
        document.querySelector('.errorValidation').innerText = 'Location is required.';
        return;
    }

    try {
        // Step 2: Prepare query object with required location
        const query = { 'address.market': location }; // Location required

        // Add optional filters if provided
        if (propertyType) query.property_type = propertyType; // Only add if it's selected
        if (bedrooms) query.bedrooms = parseInt(bedrooms, 10); // Only add if it's selected

        // Step 3: Send the query to the server
        const response = await fetch('/search-listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        // Step 4: Handle response and display results
        if (response.ok) {
            const listings = await response.json();

            // If listings match, display them; if not, show an error message
            if (listings.length > 0) {
                displayListings(listings);
                document.querySelector('.errorValidation').innerText = ''; // Clear error if matches found
            } else {
                // Show error message if no matches
                const errorValidation = document.querySelector('.errorValidation');
                errorValidation.innerText = 'No listings found for the specified criteria.';
            }
        } else {
            console.error('Error fetching listings:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}
