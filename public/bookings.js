// Step 1: Retrieve the listing data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const selectedListing = JSON.parse(sessionStorage.getItem('selectedListing'));
const bookingDetails = document.getElementById('bookingDetails');

if (selectedListing) {
bookingDetails.innerHTML = `
            <h3>Property Details:</h3>
            <p><strong>Name:</strong> ${selectedListing.name}</p>
            <p><strong>Summary:</strong> ${selectedListing.summary}</p>
            <p><strong>Daily Rate:</strong> $${selectedListing.price}</p>
            <p><strong>Customer Rating:</strong> ${selectedListing.review_scores?.review_scores_rating || 'N/A'}</p>
        `;
    } else {
bookingDetails.innerHTML = '<p>No property selected.</p>';
    }
});

// Step 2: Client-Side Validation for Dates and other fields
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

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
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(yourName)) {
    document.getElementById('nameValidation').textContent = "Name should only contain letters and spaces.";
    isValid = false;
    }

    // Email validation (format with @ and .com)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(emailAddress)) {
    document.getElementById('emailValidation').textContent = "Please enter a valid email address (e.g., name@gmail.com).";
    isValid = false;
    }

    // Phone number validation (only digits)
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(daytimePhone)) {
    document.getElementById('daytimePhoneValidation').textContent = "Daytime phone should only contain numbers.";
    isValid = false;
    }
    if (!phonePattern.test(mobileNo)) {
    document.getElementById('mobileValidation').textContent = "Mobile phone should only contain numbers.";
    isValid = false;
    }

    // Postal and Residential address validation (street, suburb, state format)
    const addressPattern = /^\d+\s+[a-zA-Z\s]+,\s+[a-zA-Z\s]+,\s+[a-zA-Z\s]+$/;
    if (!addressPattern.test(postalAddress)) {
    document.getElementById('postalAddressValidation').textContent = "Please enter postal address in the format: 'Street Address, Suburb, State'.";
    isValid = false;
    }
    if (!addressPattern.test(residentialAddress)) {
    document.getElementById('residentialAddressValidation').textContent = "Please enter residential address in the format: 'Street Address, Suburb, State'.";
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
    const booking = {
    booking_id: bookingId,
    arrival_date: new Date(checkIn), // Convert to ISO 8601
    departure_date: new Date(checkOut), // Convert to ISO 8601
    client: {
        name: yourName,
        email: emailAddress,
        daytime_phone: daytimePhone,
        mobile: mobileNo,
        postal_address: postalAddress,
        home_address: residentialAddress
    },
    deposit_paid: depositPaid,
    balance_due: balanceDue,
    balance_due_date: balanceDueDate,
    number_of_guests: numberOfGuests,
    guests: [] // Initialize empty array for guests
    };

    
    if (isValid && checkInDate >= today && checkOutDate >= checkInDate && namePattern.test(yourName)
        && emailPattern.test(emailAddress)
        && phonePattern.test(daytimePhone)
        && phonePattern.test(mobileNo)
        && addressPattern.test(postalAddress)
        && addressPattern.test(residentialAddress)) {
        alert("All values are correct Thank you.");
        //new Date().getTime().toString(),   Back up way to randomly generate a bookingID

        
        // Now, you can send this booking object to your backend
        fetch('/api/bookings', { // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookings: [booking] }) // Wrap in an object as needed
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Booking successful and sent to the server. Thank you.");
            })
            .catch((error) => {
                console.error('Error:', error);
            });   
            
}
    
});
