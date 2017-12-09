Program Name	: server.js
Description   : HPDF Week1 tasks - built on nodejs express.
Author        : Rajesh Ramadoss
Base release  : 11th Dec 2017.

Generic note	: The root ("/") is assumed to be localhost at port 5000)
Dependencies  : 1. package.json (in same folder as this nodejs program)
                2. postform.html (in same folder as this nodejs program)
                3. All the required libraries should be installed thru npm
                4. Change the port number in variable: port
How to Execute:
1.	Install Node software (in windows/linux/any operating system supporting node). Refer to https://nodejs.org
2.	Open nodejs command prompt
3.	Create a folder for your project and execute command npm init in that folder.
4.	Clone this GIT folder completely into your local system
5.	As per package.json, install all the libraries using command: npm install --save <modulename>. Example:  npm install �save express
6.	Step 5 may not be required as the subfolder node_modules in my package has all dependencies but just ensure integrity is maintained.
7.	Now read thru Dependencies and Detailed notes on tips to execute server.js.
8.	Once all set, execute the server.js using any of the below commands:
    a.	npm start (this needs the main program to be only named server.js unless you overwrite in package.json file (refer to npm documentation on how to update).
    b.	node server.js
9.	Once the server starts running, go to any browser (chrome, IE, etc...) and enter any of the below URL to verify the server has started running.
    a.	http://localhost:5000 (in case you have changed port, use that instead of 5000).
    b.	http://127.0.0.1:5000

10.	If step 9 works, then you can try any link mentioned in "Detailed notes" as per task required.


Detailed notes:
This repo is created for doing HPDF Week1 tasks. The following tasks are performed as part of Hasura HPDF Week1.
1.	A simple hello-world at "/" that displays a simple string "Hello World - <firstName>"; replace firstName with your own first name.
2.	Route "/authors" does below
    a.	Fetches a list of authors from a request to https://jsonplaceholder.typicode.com/users
    b.	Fetches a list of posts from a request to https://jsonplaceholder.typicode.com/posts
    c.	Respond with only a list of authors and the count of their posts (a newline for each author).
3.	Set a simple cookie (if it has not already been set) at http://localhost:5000/setcookie with the following values: name=<your-first-name> and age=<your-age>.
4.	Fetch the set cookie with http://localhost:5000/getcookies and display the stored key-values in it.
5.	Deny requests to your http://localhost:5000/robots.txt page. (or you can use the response at http://httpbin.org/deny if needed).
6.	Render an HTML page at http://localhost:5000/html or an image at http://localhost:5000/image.
7.	A text box at http://localhost:5000/input which sends the data as POST to any endpoint of your choice. This endpoint should log the received the received to stdout.
