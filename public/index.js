// Function to fetch and display random listings
async function fetchRandomListings() {
    try {
        const response = await fetch('/random-listings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { listings, totalCount } = await response.json(); // Destructure the response to get listings and total count
        displayListings(listings); // Listings name of value stored in MongoDB

        // Update listings count
        const listingsCount = document.getElementById('listingsCount');
        listingsCount.innerText = `${totalCount} Listings match your preferences`; // Display the total count of listings
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Function to display listings in the bottom section
function displayListings(listings) {
    const bottomSection = document.getElementById('bottomSection'); // This looks at form 

    // Clear existing content to allow update when refresh
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
        price.innerText = `Price: $${priceValue}`; // Use the converted price or 'N/A'

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
    const location = document.getElementById('locationInput').value; // Adjust this ID to match your input field
    const propertyType = document.querySelector('select[name="propertyType"]').value; // Adjust based on your select element
    const bedrooms = document.querySelector('select[name="bedrooms"]').value; // Adjust based on your select element

    try {
        // Step 2: Prepare query object based on the input parameters
        const query = {};

        // Add filters to the query based on non-empty user inputs
        if (location) {
            query['address.market'] = location; // Adjust the field based on your data structure
        }
        if (propertyType) {
            query.property_type = propertyType; // Add property type to query
        }
        if (bedrooms) {
            query.bedrooms = { $eq: parseInt(bedrooms, 10) }; // Ensure bedrooms is treated as an integer
        }

        // Clear existing listings in the bottom section before displaying new results
        const response = await fetch('/search-listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        // Step 3: Handle response and display results
        if (response.ok) {
            const listings = await response.json();
            displayListings(listings); // Use the displayListings function to show results

            // Step 4: Check if any listings were found
            if (listings.length === 0) {
                const errorValidation = document.querySelector('.errorValidation'); // Adjust the class to match your error message element
                errorValidation.innerText = 'No listings found for the specified criteria.'; // Show error message
            }
        } else {
            console.error('Error fetching listings:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
        // Display error message if an error occurs
    }
}
