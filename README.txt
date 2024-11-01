# ------------------------------------- What is this project? ------------------------------------------------------------------- ####

DatabaseApplicationsA3
This is an assignment where I combine the use of using MongoDB, making a Web Application and presumably use sharding.
learn the basics of combining MongoDB and javascript 
frameworks such as node.js, express etc to build a fullstack web application. 


# ---------------------------------------   Steps to Run --------------------------------------------------------------------------
Ensure the connection to MondoDB
- Connect IP address to Atlas
- Ensure connection in MongoDB  compass

1. Install the Pacakages
In the command terminal of visual studio (Ctrl + P), 
npm install express 
npm install mongodb 
npm install nodemon
npm install dotenv
OR: npm install express mongodb nodemon dotenv

2. Run the application 
run nodemon 
OR node server.js

3. Access index.html: Begin at the homepage to view and search listings.
4. Navigate to Booking Page: Select a listing and proceed to bookings.html to book.
5. Confirm Booking: Complete the form, submit, and view confirmation on confirmation.html.

# ----------------------------------------- Creation Process ----------------------------------------------------------------------------- #
1. Make folder directory and download packages.

2. Create the folder structure 
    Public: Stores files visible to people (html,js,css)
    Source: Files that handle routes
    Routes: Routes and end points required for server
    Models: Handle client and server side validation

3. Create a file to run the application (Ex 3.4)
- Create index.html(form)
- Create server.js to run application. THIS IS INDEX.JS in exercise
- Make a connection to MongoDB. This is by creatiing a file, server.js to run the whole application 

4. Create the HTML Pages 
- index.html, bookings.html and confirmation.html
- Create a style.css sheet.

5. Create index.js 
5.1 Create a function to display random values 
- My reasoning for this is that if I build it first, I can then build the user input on top then make a function later
  to proceed to booking page. 
5.2 Create a function to search for values (Ex 3.5.7)

6. Create bookings.js 
6.1. Retrieve the values from index.html (session)
6.2. Client Side valdation (e.g.YYYY-MM-DD)
6.3. I inserted the bookings objected in MongoDB just to be safe (refer to )

6.3. Server side processing (server.js)
    Validate the incoming data.
    Convert dates to the ISO 8601 format, which MongoDB requires.
    Insert the booking into the bookings array of the relevant listing document.
    INDEX.html: Make the index file have GET's randomised listsings
        - I get because it is okay to cache random listings
6.4 Server side validation 
- After entering and validating on client side, we send to server side to Validate
- This is by creating object on server to Validate
- This is to check if all fields are present and transform any necessary data formats

7. confirmation.html
Have this file store the results.
Ensure a link to clear the session via a link or clicking nav bar.

#EXTRA
#MongoDB command to enter bookings array to ALL documents in compass.
- This was a way to not worry about the booking array not being there 
db.listingsAndReviews.updateMany(
  { bookings: { $exists: false } },  // Filter for documents without the "bookings" array
  {
    $set: {
      bookings: [
        {
          booking_id: null,
          arrival_date: null,
          departure_date: null,
          client: {
            name: "",
            email: "",
            daytime_phone: "",
            mobile: "",
            postal_address: "",
            home_address: ""
          },
          deposit_paid: null,
          balance_due: null,
          balance_due_date: null,
          number_of_guests: null,
          guests: [
            {
              name: "",
              age: null
            }
          ]
        }
      ]
    }
  }
);

### --------------------------------- Setup and Application Flow ----------------------------------------------------------------- ##########
1. Folder Directory & Package Installation
Initialize project folder and install necessary packages (Express, MongoDB, etc.).

2. Folder Structure Creation
Organize Public, Source, Routes, and Models directories for a clear separation of front-end and back-end logic.

3. Application Start (server.js)
Server Setup:
  Sets up the Express server to run on a specified port (e.g., 3000).
  Connects to MongoDB and initializes routes and middleware for request handling and database interactions.
Running the Server: Ensure the server runs on http://localhost:3000 or the specified port in .env.
  
Endpoints:
  /: Serves index.html.
  /api/listings: GET endpoint for random listings.
  /api/bookings: POST endpoint to submit booking data.

4. HTML Pages
index.html:
  Main landing page with a search form and random Airbnb listings.
bookings.html:
  Booking page where selected listing details are shown and booking form is available.
confirmation.html:
  Displays booking confirmation details after a successful submission.

5. JavaScript Files
index.js
  Random Listings Display:
    Fetches random listings from the server to display on the landing page.
  Search Functionality:
    Handles search form input to filter listings based on user input and sends a request to the server.
  Redirect to Booking Page:
    Saves selected listing in session storage and navigates to bookings.html for booking.
bookings.js
  Listing Retrieval:
    Retrieves selected listing details from session storage and displays them.
  Client-Side Validation:
    Validates booking form fields such as dates, name, email, and phone numbers.
  Booking Submission:
    Sends validated booking data to the server to update the database with the booking entry.

6. Database Interaction (Server-Side Processing in server.js)
Data Validation:
  Validates booking data received from the client and ensures required fields are present.
Data Formatting:
  Converts dates to ISO 8601 format for MongoDB compatibility.
Booking Insertion:
  Adds validated booking data to the bookings array of the corresponding listing document in MongoDB.
7. Confirmation Page (confirmation.html)
Display Confirmation:
  Retrieves booking data from session storage and displays it.
Clear Session on Return:
  Link to return to index.html and clear session storage for a new booking session.

# --------------------------------------- Issues encountered ---------------------------------------- 
ObjectObject: 
    w3schools (2024), JavaScript Array map(), w3schools, accessed on 1 November 2024. https://www.w3schools.com/jsref/jsref_map.asp
Convert date into IS0 8601: 
    w3schools (2024), ISO to string, w3schools, accessed on 1 November 2024.https://www.w3schools.com/jsref/jsref_toisostring.asp

To troubleshoot.
- Add console.log(value); //To see if the value is being passed
- Check the console in the serevr (CTRL + 12). Also look at tab "Network".
- Look online what the error messages mean. 

# ------------------------------------------- References -----------------------------------------------------------------
Understand functions:
  mdn web docs (2024) Functions, mdn web docs website, accessed 1 November 2024. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions 
Understand GET and POST request: 
  stackoverflow (2008) What is the difference between POST and GET [duplicate] website, accessed on 1 November 2024. https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get
  Udacity (2012) Differences Between Get and Post - Web Development, accessed on 1 November 2024. https://www.youtube.com/watch?v=UObINRj2EGY

What is node: 
w3schools (2024) Node.js Introduction, w3schools website, accessed on 1 November 2024. https://www.w3schools.com/nodejs/nodejs_intro.asp
Net Ninja (2024) Node.js Crash Course Tutorial #9 - MongoDB, YouTube Website, accessed on 1 November 2024. https://www.youtube.com/watch?v=bxsemcrY4gQ
What is express: 
  simplilearn (July 11 2024) Express JS Tutorial, simplilearn website, accessed on 1 November 2024. https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-express-js 
  r/javascript (2014) What is expressJS exactly? i keep hearing nodeJS and express, but I don't know what express is except it's some kinda framework., reddit website, accessed on 1 November 2024. https://www.reddit.com/r/javascript/comments/36sef5/what_is_expressjs_exactly_i_keep_hearing_nodejs/ 
Work with mongoose:
  geeksforgeeks (15 May,2024) npm mongoose, geeksforgeeks website, accessed on 1 November 2024.https://www.geeksforgeeks.org/npm-mongoose/
To handle events: 
  nodejs (2024) The Node.js Event emitter, nodejs website, accessed on 1 November 2024. https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter

Referencing guide
  RMIT University (2024) Easy cite referencing guide, RMIT Library website, accessed on 1 November 2024.
  https://www.lib.rmit.edu.au/easy-cite/?styleguide=styleguide-6#stn-0

Research
Kanak Infosystems LLP. (2023) 'How to Connect Node.js and MongoDB: Building a Dynamic Web Application' [video], Kanak Infosystems LLP., YouTube, accessed 1 November 2024. https://www.youtube.com/watch?v=NQiFuoX949k
Dave Gray (2021) 'Introduction to Node JS | Node.js Tutorials for Beginners' [video], Dave Gray., YouTube website, accessed 1 November 2024.https://www.youtube.com/watch?v=JZXQ455OT3A
How to Connect Node.js and MongoDB: Building a Dynamic Web Application, YouTube website, accessed on 1 Novemver 2024. https://www.youtube.com/watch?v=NQiFuoX949k

//Modules
 // Include path as a module: To avoid hard coding paths, looking at if a path exists (existsSync)
  Dave Gray (2021) Reading and Writing Files with Node.js | Node JS Beginners Tutorial, YouTube website, accessed on 1 November 2024. https://youtu.be/yQBw8skBdZU?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&t=403 
 //Understand 'url module
  codecademy (2024) The node Command, codecademy website, accessed on 1 November 2024. https://www.codecademy.com/learn/learn-node-js/modules/intro-to-node-js/cheatsheet
 //What is NPM
  Dave Gray (2021) NPM Node Package Manager Modules | NPM Tutorial for Beginners, YouTube website, accessed on 1 November 2024. https://www.youtube.com/watch?v=oGO_-DWTmKA&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=3
 //Where to get packages
  npm (2024) npm, npm website, accessed on November 1 2024. https://www.npmjs.com/

Understanding folder structure 
Folder structure for a Node JS project, accessed on 1 November 2024. https://www.geeksforgeeks.org/folder-structure-for-a-node-js-project/

Create pages
w3schools (2024) form submit, w3schools website accessed 1 November2024. https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit
w3schools (2024) html blocks, w3schools website accessed 1 November2024.https://www.w3schools.com/html/html_blocks.asp
w3schools (2024) css dropdowns, w3schools website accessed 1 November 2024.https://www.w3schools.com/css/css_dropdowns.asp
mdn web docs (2024) Storing the information you need — Variables, mdn web docs website accessed 1/11/2024.https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#what_is_a_variable
https://youtu.be/fbYExfeFsI0