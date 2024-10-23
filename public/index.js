// Function to fetch and display random listings
async function fetchRandomListings() {
    try {
        const response = await fetch('/random-listings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Function to display listings in the bottom section
function displayListings(listings) {
    const bottomSection = document.getElementById('bottomSection');
    bottomSection.innerHTML = ''; // Clear existing content

    listings.forEach(listing => {
        // Create a div for each listing
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing';

        // Create the hyperlink
        const listingLink = document.createElement('a');
        listingLink.href = `bookings.html?listing_id=${listing._id}`; // URL with listing ID
        listingLink.innerText = listing.name; // Listing name as hyperlink

        // Create listing summary
        const summary = document.createElement('p');
        summary.innerText = `Summary: ${listing.summary || 'No summary available'}`; // Summary text

        // Create price and rating elements
        const price = document.createElement('p');
        price.innerText = `Price: $${listing.price || 'N/A'}`; // Price text

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
