// Function to fetch and display random listings
async function fetchRandomListings() {
    try {
        const response = await fetch('/random-listings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const listings = await response.json();
        displayListings(listings); //Listings name of value stored in MongoDB
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Function to display listings in the bottom section
function displayListings(listings) {
    const bottomSection = document.getElementById('bottomSection'); // This looks at form 
    const listingsCount = document.getElementById('listingsCount'); //

    // Make the id = the count of listings from MongoDB
    listingsCount.innerText = `${listings.length} Listings match your preferences`;

    bottomSection.innerHTML = ''; // Clear existing content to allow update when refresh

    listings.forEach(listing => {
        // Create a div for each listing
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing';

        // Create the hyperlink
        const listingLink = document.createElement('a'); //https://www.w3schools.com/tags/tag_a.asp
        listingLink.href = `bookings.html?listing_id=${listing._id}`; // URL with listing ID
        listingLink.innerText = listing.name; // Listing name as hyperlink
        listingLink.className = 'active'; // Add class for active styling

        // Create listing summary
        const summary = document.createElement('p');
        summary.innerText = `Summary: ${listing.summary || 'No summary available'}`; // Summary text

        // Create price and rating elements
        const price = document.createElement('p');

        // If listing.price is a Decimal128 object, convert it to a string first, else use the value directly
        const priceValue = listing.price ? listing.price.toString() : 'N/A';
        price.innerText = `Price: $${priceValue}`; // Use the converted price or 'N/A'


        const rating = document.createElement('p');
        rating.innerText = `Customer Rating: ${listing.review_scores?.review_scores_rating || 'N/A'}`; // Rating text

        // Append elements to listing div: https://www.w3schools.com/jsref/met_node_appendchild.asp
            //We append as while summary,price and rating are created, not added to DOM.
            //Removing this does not display the results
        listingDiv.appendChild(listingLink);
        listingDiv.appendChild(summary);
        listingDiv.appendChild(price);
        listingDiv.appendChild(rating);

        // Append listing div to bottom section
        bottomSection.appendChild(listingDiv);
    });
}

//Call the fetchRandomListings function when the page loads
//  Ensures that all the elements are loaded and accessible when the function is called.
//  Prevents errors - An error may occur if DOM interacts with elements that don't exist yet.
window.onload = fetchRandomListings;
