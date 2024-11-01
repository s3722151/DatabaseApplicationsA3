Add to dicussion 
- Ports 
- Set of npm commands to run 


# DatabaseApplicationsA3
This is an assignment where I combine the use of using MongoDB, making a Web Application and presumably use sharding.
learn the basics of combining MongoDB and javascript 
frameworks such as node.js, express etc to build a fullstack web application. 


#Steps 
Ensure the connection to MondoDB
- Connect IP address to Atlas
- Ensure connection in MongoDB  compass

1. Install the Pacakages
npm install express 
npm install mongodb 
npm install nodemon
npm install express mongodb dotenv

2. Run the application 
run nodemon 
OR node server.js


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


#MongoDB command to enter bookings array to ALL documents in compass
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


#Issues encountered 
ObjectObject: 
    w3schools (2024), JavaScript Array map(), w3schools, accessed on 1 November 2024. https://www.w3schools.com/jsref/jsref_map.asp
Convert date into IS0 8601: 
    w3schools (2024), ISO to string, w3schools, accessed on 1 November 2024.https://www.w3schools.com/jsref/jsref_toisostring.asp

#References 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions 
Understand GET and POST request: 
https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get
Udacity (2012) https://www.youtube.com/watch?v=UObINRj2EGY




What is node: 
w3schools, 
Node.js Introduction
https://www.w3schools.com/nodejs/nodejs_intro.asp
https://www.youtube.com/watch?v=bxsemcrY4gQ
What is express: 
https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-express-js 
https://www.reddit.com/r/javascript/comments/36sef5/what_is_expressjs_exactly_i_keep_hearing_nodejs/ 
Work with mongoose: 
https://www.geeksforgeeks.org/npm-mongoose/
To handle events: 
https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter

Referencing guide
RMIT University (2024) Easy cite referencing guide, RMIT Library website, accessed on 1 November 2024.
https://www.lib.rmit.edu.au/easy-cite/?styleguide=styleguide-6#stn-0

Research
Kanak Infosystems LLP. (2023) 'How to Connect Node.js and MongoDB: Building a Dynamic Web Application' [video], Kanak Infosystems LLP., YouTube, accessed 1 November 2024. https://www.youtube.com/watch?v=NQiFuoX949k
Dave Gray (2021) 'Introduction to Node JS | Node.js Tutorials for Beginners' [video], Dave Gray., YouTube, accessed 1 November 2024.https://www.youtube.com/watch?v=JZXQ455OT3A
How to Connect Node.js and MongoDB: Building a Dynamic Web Application, accessed on 1 Novemver 2024. https://www.youtube.com/watch?v=NQiFuoX949k

//Modules
    // Include path as a module: To avoid hard coding paths, looking at if a path exists (existsSync)
    https://youtu.be/yQBw8skBdZU?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&t=403 
    //Understand 'url module
    https://www.codecademy.com/learn/learn-node-js/modules/intro-to-node-js/cheatsheet
//What is NPM
https://www.youtube.com/watch?v=oGO_-DWTmKA&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=3
    //Where to get packages
    https://www.npmjs.com/

Understanding folder structure 
Folder structure for a Node JS project, accessed on 1 November 2024. https://www.geeksforgeeks.org/folder-structure-for-a-node-js-project/

Create pages
w3schools (2024) form submit, w3schools website accessed 1 November2024. https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit
w3schools (2024) html blocks, w3schools website accessed 1 November2024.https://www.w3schools.com/html/html_blocks.asp
w3schools (2024) css dropdowns, w3schools website accessed 1 November 2024.https://www.w3schools.com/css/css_dropdowns.asp
mdn web docs (2024) Storing the information you need — Variables, mdn web docs website accessed 1/11/2024.https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#what_is_a_variable
https://youtu.be/fbYExfeFsI0