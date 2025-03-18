## Get Started
This repository consists of a [CRA](https://create-react-app.dev/docs/getting-started) UI app and a basic [express](http://expressjs.com/) API server.

UI will run on port *3000* by default and API will run on port *3001* by default

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.org/) 

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/chriskurhandll/react-express-code-interview.git
 $ cd react-express-code-interview
 $ cd client 
 $ npm install
 $ cd ../server
 $ npm install
 $ npm run start in both client and server directories
```

### 3. Usage

UI URL:  http://localhost:3000/
API URL: http://localhost:3001/api

For this coding challenge, only the server project is needed to be running

You would need to use an API development tool like Postman to test it

The following is supported

- http://localhost:3001/api/users: Will retrieve the list of users by default page size is 50 and default page is 1
- You can sort the array by sending a parameter called ```sort_by```, its value should be the name of the field in lower case, for this particular example either ```id``` or ```name``` followed by a underscore(``_``) and either ``ASC`` or ``DESC`` depending on the order of the sort

The payload response contains

- ``data`` the list of users based on sorting and pagination sent
- ``totalCount`` the total number of users regardless of pagination
- ``previous`` contains the parameters to be appended to the URL to get the previous set of data, doesn't return if there is no previous data
- ``next`` contains the parameters to be appended to the URL to get the next set of data, doesn't return if the returned list is already at the end of the total index



CORS is enabled on the server so API calls from UI will succeed.# react-express-code-interview
