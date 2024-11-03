let selectedListing; // Declare in outer scope

// Step 1: Retrieve the listing data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    selectedListing = JSON.parse(sessionStorage.getItem('selectedListing'));
    const bookingDetails = document.getElementById('bookingDetails');

    if (selectedListing) {
        bookingDetails.innerHTML = `
            <h3>Property Details:</h3>
            <p><strong>Name:</strong> ${selectedListing.name}</p>
            <p><strong>Summary:</strong> ${selectedListing.summary}</p>
            <p><strong>Daily Rate:</strong> $${selectedListing.price}</p>
            <p><strong>Customer Rating:</strong> ${selectedListing.review_scores?.review_scores_rating || 'N/A'}</p>
            <p><strong>Listing ID:</strong> ${selectedListing._id}</p> <!-- Display or use _id -->
        `;
        console.log("Listing ID:", selectedListing._id); // Debug to confirm _id presence (server console)
    } else {
        bookingDetails.innerHTML = '<p>No property selected.</p>';
    }
});


// Step 2: Client-Side Validation for Dates and other fields
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    if (!selectedListing) {
        console.error("No listing selected.");
        return;
    }

    // Clear previous error messages
    document.getElementById('checkInValidation').textContent = '';
    document.getElementById('checkOutValidation').textContent = '';
    document.getElementById('nameValidation').textContent = '';
    document.getElementById('emailValidation').textContent = '';
    document.getElementById('daytimePhoneValidation').textContent = '';
    document.getElementById('mobileValidation').textContent = '';
    document.getElementById('postalAddressValidation').textContent = '';
    document.getElementById('residentialAddressValidation').textContent = '';

    // Retrieve form values
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const yourName = document.getElementById('yourName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const daytimePhone = document.getElementById('daytimePhone').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const postalAddress = document.getElementById('postalAddress').value;
    const residentialAddress = document.getElementById('residentialAddress').value;

    let isValid = true;

    // Date validation (YYYY-MM-DD)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    if (checkInDate < today) {
        document.getElementById('checkInValidation').textContent = "Check In date must be today or in the future. (DD/MM/YYYY)";
        isValid = false;
    }
    if (checkOutDate < today) {
        document.getElementById('checkOutValidation').textContent = "Check Out date must be today or in the future.(DD/MM/YYYY)";
        isValid = false;
    }
    if (checkInDate >= checkOutDate) {
        document.getElementById('checkOutValidation').textContent = "Check Out date must be after Check In date.";
        isValid = false;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    if (!datePattern.test(checkIn) || !datePattern.test(checkOut)) {
        document.getElementById('checkInValidation').textContent = "Please enter Check In and Check Out details in YYYY-MM-DD format.";
        isValid = false;
    } else {
        // Check if Check-In date is valid
        const [checkInYear, checkInMonth, checkInDay] = checkIn.split('-').map(Number);
        if (checkInYear < currentYear || (checkInYear === currentYear && checkInMonth < currentMonth)) {
            document.getElementById('checkInValidation').textContent = "Check In date must be the current month or in the future.";
            isValid = false;
        }

        // Check if Check-Out date is valid
        const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split('-').map(Number);
        if (checkOutYear < currentYear || (checkOutYear === currentYear && checkOutMonth < currentMonth)) {
            document.getElementById('checkOutValidation').textContent = "Check Out date must be the current month or in the future.";
            isValid = false;
        }
    }

    // Name validation (no numbers allowed)
    const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    if (!namePattern.test(yourName)) {
        document.getElementById('nameValidation').textContent = "Name should contain two words, each starting with a capital letter (e.g., John Doe).";
        isValid = false;
    }

    // Email validation (format with @ and .com)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(emailAddress)) {
        document.getElementById('emailValidation').textContent = "Please enter a valid email address (e.g., name@gmail.com).";
        isValid = false;
    }

    // Phone number validation (must start with 04, 10 digits, format: 0000 000 000)
    const phonePattern = /^04\d{2} \d{3} \d{3}$/;
    if (!phonePattern.test(daytimePhone)) {
        document.getElementById('daytimePhoneValidation').textContent = "Daytime phone must be in the format: 0000 000 000 and start with 04.";
        isValid = false;
    }
    if (!phonePattern.test(mobileNo)) {
        document.getElementById('mobileValidation').textContent = "Mobile phone must be in the format: 0000 000 000 and start with 04.";
        isValid = false;
    }

    // Postal and Residential address validation (street, suburb, state format)
    const addressPattern = /^\d+\s+[a-zA-Z\s]+,\s+[a-zA-Z\s]+,\s+[a-zA-Z\s]+$/;
    if (!addressPattern.test(postalAddress)) {
        document.getElementById('postalAddressValidation').textContent = "Please enter postal address in the format: '10 Street Address, Suburb, State'.";
        isValid = false;
    }
    if (!addressPattern.test(residentialAddress)) {
        document.getElementById('residentialAddressValidation').textContent = "Please enter residential address in the format: '10 Street Address, Suburb, State'.";
        isValid = false;
    }

    // If all validations pass and check-in date is today or in the future
    // Assuming the following user input fields
    const bookingId = Math.floor(Math.random() * 10000); // Random booking ID
    const depositPaid = 0; // Set deposit_paid as needed
    const balanceDue = 0; // Example calculation for balance due
    const balanceDueDate = new Date(); // Set to today or calculate as needed
    const numberOfGuests = 0; // Example for total number of guests

    // Build the booking object
    // const booking = {
    //     booking_id: bookingId,
    //     arrival_date: new Date(checkIn), // Convert to ISO 8601 (was missing .iso function)
    //     departure_date: new Date(checkOut), // Convert to ISO 8601
    //     client: {
    //         name: yourName,
    //         email: emailAddress,
    //         daytime_phone: daytimePhone,
    //         mobile: mobileNo,
    //         postal_address: postalAddress,
    //         home_address: residentialAddress
    //     },
    //     deposit_paid: depositPaid,
    //     balance_due: balanceDue,
    //     balance_due_date: balanceDueDate,
    //     number_of_guests: numberOfGuests,
    //     guests: [] // Initialize empty array for guests
    // };


    if (isValid && checkInDate >= today && checkOutDate >= checkInDate && namePattern.test(yourName)
        && emailPattern.test(emailAddress)
        && phonePattern.test(daytimePhone)
        && phonePattern.test(mobileNo)
        && addressPattern.test(postalAddress)
        && addressPattern.test(residentialAddress)) {
        alert("All values are correct Thank you.");
        //new Date().getTime().toString(),   Back up way to randomly generate a bookingID


        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listingId: selectedListing._id, // Send _id as listingId
                booking: {
                    booking_id: bookingId,
                    arrival_date: new Date(checkIn).toISOString(), // Convert to ISO 8601 format,
                    departure_date: new Date(checkOut).toISOString(), // Convert to ISO 8601 format,
                    client: {
                        name: yourName,
                        email: emailAddress,
                        mobile: mobileNo,
                        postal_address: postalAddress,
                        home_address: residentialAddress
                    }
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Booking added:', data);

        // Save booking information to sessionStorage
        sessionStorage.setItem('bookingConfirmation', JSON.stringify({
                listingName: selectedListing.name,
                booking_id: bookingId,
                arrival_date: checkIn,
                departure_date: checkOut,
                client_name: yourName,
                client_email: emailAddress
            }));
                
            // Redirect to confirmation.html
            window.location.href = 'confirmation.html';

        }) 
        .catch(error => {
            console.error('Error:', error);
        });
    }

});
