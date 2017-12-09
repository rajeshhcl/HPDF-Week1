/* server.js
Version History
    version       : 1.0
    Description   : HPDF Week1 tasks - built on nodejs express
    Author        : Rajesh Ramadoss
    Base release  : 11th Dec 2017.

Generic note: here the root ("/" is assumed to be localhost at port 5000)

Dependencies: 1. package.json (in same folder as this nodejs program)
              2. postform.html (in same folder as this nodejs program)
              3. all the required libraries should be installed thru npm
              4. change the port number in variable: port

The following tasks are performed as part of Hasura HPDF Week1:
1.	A simple hello-world at "/" that displays a simple string
    "Hello World - <firstName>"; replace firstName with your own first name.
2.	Route "/authors" does below
  a.	fetches a list of authors from a request to https://jsonplaceholder.typicode.com/users
  b.	fetches a list of posts from a request to https://jsonplaceholder.typicode.com/posts
  c.	Respond with only a list of authors and the count of their posts (a newline for each author).
3.	Set a simple cookie (if it has not already been set) at http://localhost:5000/setcookie with the following values: name=<your-first-name> and age=<your-age>.
4.	Fetch the set cookie with http://localhost:5000/getcookies and display the stored key-values in it.
5.	Deny requests to your http://localhost:5000/robots.txt page. (or you can use the response at http://httpbin.org/deny if needed)
6.	Render an HTML page at http://localhost:5000/html or an image at http://localhost:5000/image.
7.	A text box at http://localhost:5000/input which sends the data as POST to any endpoint of your choice. This endpoint should log the received the received to stdout.
*/

// Importing express and relevant libraries
var express = require('express');
var dateFormat = require('dateformat');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var tableify = require('tableify');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Declaration of common variables & functions across all tasks
var app = express();
var port = 5000;
var firstName = 'Hasura'
var datestamp;
var now;
var cookieName = 'cookieName';
var cookieObject = {'name': 'Hasura', 'age' : '01' };

// methodTime - get current timestamp and report last executed route in console
function methodTime(link)
  {
    now = new Date();
    datestamp = dateFormat(now, "dd-mm-yyyy h:MM:ss TT")
    console.log('Get method executed for ' + link + ' page at : '+ datestamp)
  }

//Task 1 - To print hello world with name
app.get('/', function(req,res)
             {
                res.send('Hello World - ' + firstName)
                methodTime('root (/)');
             }
       )
//End of Task 1

//Task 2 -  To get all author details from users URL and posts from posts URL
//          and to display the no. of posts each author got.
app.get('/authors',function readUrl(req0,res0)
{  fetch('https://jsonplaceholder.typicode.com/users')
      .then(function(res) {return res.json();})
      .then(function(authJSON)
           {   fetch('https://jsonplaceholder.typicode.com/posts')
                   .then(function(res) {return res.json();})
                   .then(function(postJSON)
                     { var postCount = 0;
                       var authHolder = {'toWrite' : []};
                       for (var i = 0; i < authJSON.length; i++)
                         {
                           for (var j = 0; j < postJSON.length; j++)
                           {
                              if (authJSON[i].id == postJSON[j].userId)
                                {
                                  postCount++;
                                }
                           }
                           authHolder.toWrite.push({'Author Name': authJSON[i].name,
                                                    'No. of Posts':postCount.toString()});
                           postCount = 0;
                         }
                       var html = tableify(authHolder.toWrite);
                       res0.send(html);
                       methodTime('/authors');
                     })
           })
})
//End of Task 2

//Task 3 - setcookie    - Seting cookie (if it has not already been set) with name and age
//Task 4 - getcookies   - Getting the cookie set in Task 3.
//         deletecookie - Deleting a already set cookie.
app.use(cookieParser());
//checkSetCookie - If cookie name already exists, returns appropriate message
//                 Else, will either pick default cookie value or overrides
//                 with URL params passed.
function checkSetCookie (req,res)
    {
        if (req.cookies.cookieName)
        {
           res.send('Cookie already exists')
        }
        else {
                cookieObject.name = 'Hasura'
                cookieObject.age  = '01'
                if (req.params.name !== ' ' && req.params.name !== null
                                            && req.params.name !== undefined)
                   {cookieObject.name = req.params.name}
                if (req.params.age !== ' ' && req.params.age !== null
                                           && req.params.age !== undefined)
                   {cookieObject.age = req.params.age}
                res.cookie(cookieName,cookieObject);
                res.send('Cookie is set/updated successfuly')
             }
        methodTime('/setcookie');
    }
// "/setcookie" - can be called without any parameters or with name & age as
//              positional parameters (1st as name and 2nd as age).
app.get ('/setcookie', (req,res) => {checkSetCookie (req,res)});
app.get ('/setcookie/:name?/:age?', (req,res) => {checkSetCookie (req,res)});

// "/getcookies" link - display cookie values (if already set).
app.get ('/getcookies', function(req,res)
     {
        if (req.cookies.cookieName)
          {
            res.write('Name : ' +
                     req.cookies.cookieName.name + '\n' +
                     'Age  : '+ req.cookies.cookieName.age);
            res.end();
          }
          else
            {res.send('Cookie does not exist')}
          methodTime('/getcookies');
     }
  )

// "/deletecookie" link - delete the cookie (if already present)
app.get ('/deletecookie', function(req,res)
    {
       res.clearCookie(cookieName);
       res.send('Cookie is deleted (if already present)')
       methodTime('/deletecookie');
    }
  )
//End of Task 3 & 4

//Task 5 - Deny requests to your http://localhost:8080/robots.txt page
app.get('/robots.txt', function(req,res)
    {
       res.send("Sorry, you are not authorized to visit this page")
       methodTime('/robots.txt');
    }
 )
//End of Task 5

//Task 6 - Render an HTML page at http://localhost:8080/html
app.get('/html', function(req,res)
    {
      res.sendFile(__dirname + '/postform.html');
      methodTime('/html');
    }
 )
//End of Task 6

//Task 7 - /input gets some user data and posts it as JSON to /process.
app.get('/input', function(req,res)
   {
     res.sendFile(__dirname + '/postform.html');
     methodTime('/input');
   }
 )

var urlEncoderParser = bodyParser.urlencoded({extended : false});
app.post('/process',urlEncoderParser,function(req,res)
   {
     resp = {
            first_name:req.body.first_name,
            last_name:req.body.last_name
          };
     process.stdout.write('\nFirstname : ' + resp.first_name +
                          '\nLastname  : ' + resp.last_name +
                          '\n'
                         );
     res.end(JSON.stringify(resp));
     methodTime('/process');
   }
 )
//End of Task 7

//below returns proper message for any other pages accessed.
app.use(function (req, res, next)
    {
       res.status(404).send("Sorry, the page you are looking for is not available");
       methodTime('an unauthorized');
    }
  )
//express app listens at port mentioned
app.listen(port,() => console.log('Server listening in Port : ' + port));
//End of program
