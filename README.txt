# DatabaseApplicationsA3
This is an assignment where I combine the use of using MongoDB, making a Web Application and presumably use sharding.
learn the basics of combining MongoDB and javascript 
frameworks such as node.js, express etc to build a fullstack web application. 

Refresher 
Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions 
Understand GET and POST request: https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get
    https://www.youtube.com/watch?v=UObINRj2EGY


Steps
1. Download the necessary software
- Visual Studio Code: https://code.visualstudio.com/download
- Node 
- Download MongoDB
Fortunately I already installed it in advance.

2. Download the necessary packages
- express, npm init -y, mongoose
What is node: https://www.w3schools.com/nodejs/nodejs_intro.asp 
What is express: https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-express-js 
    https://www.reddit.com/r/javascript/comments/36sef5/what_is_expressjs_exactly_i_keep_hearing_nodejs/ 
Work with mongoose: https://www.geeksforgeeks.org/npm-mongoose/
To handle events: https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter


3. Make Folders
Public: Contains files that anyone can access directly through the web browser.
Models: Defines the structure of the data that your application uses (like a blueprint).
    Examples: Schemas: Files that specify what data to expect from the client (like user information) and how to validate that data (like ensuring an email is in the correct format).


4. Make the files (index.html,booking.html, confirmation.html)

5. Make a connection to MongoDB
- This is by creatiing a file, server.js to run the whole application 
- Creating index.js 

6. INDEX.html: Make the index file have GET's randomised listsings
- I get because it is okay to cache random listings

7. INDEX.html: Check if what the user inputted is equal to what is stored
    Following this tutorial: https://youtu.be/fbYExfeFsI0
    Directory files: ProgrammingProjects\MongoDBCrashCourse
    Creating
    -After creating directory and copying connection string
    - First connect to database than list the database
    -Use the await when searching


    Notes
    -Mongodb stores data in BSON, binary version of JSON
    -A collection is a table

    Assignment 
    Look at 2, to connect
    Look at 5 to look at the location  
    Look at 6 to look at multiple listings for bathrooms
        - Edit the cursor gte, by making it a normal query.

7. To add a booking to the database when you submit from booking page


8.Make a listing clickable
- This should lead to the 



Referencing guide
https://www.lib.rmit.edu.au/easy-cite/?styleguide=styleguide-6#stn-0
Research
//Tutorials for Node
https://www.youtube.com/watch?v=JZXQ455OT3A 
    //How to Connect Node.js and MongoDB: Building a Dynamic Web Application
    https://www.youtube.com/watch?v=NQiFuoX949k
//Modules
    // Include path as a module: To avoid hard coding paths, looking at if a path exists (existsSync)
    https://youtu.be/yQBw8skBdZU?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&t=403 
    //Understand 'url module
    https://www.codecademy.com/learn/learn-node-js/modules/intro-to-node-js/cheatsheet
//What is NPM
https://www.youtube.com/watch?v=oGO_-DWTmKA&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=3
    //Where to get packages
    https://www.npmjs.com/

Step 3: Create Folder structure
https://www.geeksforgeeks.org/folder-structure-for-a-node-js-project/
    Public: Stores files visible to people (html,js,css)
    Source: Files that handle routes
    Routes: Routes and end points required for server
    Models: Handle client and server side validation
Step 4: Create pages
https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit
https://www.w3schools.com/html/html_blocks.asp
https://www.w3schools.com/css/css_dropdowns.asp
Know how to store user input: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#what_is_a_variable