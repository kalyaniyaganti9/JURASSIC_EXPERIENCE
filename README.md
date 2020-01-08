# JURASSIC_EXPERIENCE
A React web app which allows users to schedule their tour visits in the fictional Jurassic world.
A Multi user Web App using React and express framework which allows users to schedule their tours in Jurassic World. It implements bcryptjs, a hashing algorithm for user authentication, Express-session for session implementation. Used libraries like NeDB, a javascript database to handle JSON data and Mocha test framework for testing the application during the development.
### To Launch this app one has to follow the below steps
1. Install Nodejs
2. Install git
3. Clone this repository into local file system.
4. Now to run the below command from the tourserver directory to get the server running from command line.
    * Command : **node serverRun**
    * Command : **npm install express** to install express.
5. To launch the react app run this command form ReactTour directory from command line.
    * Command : **node DevProxy**
    * Command : **npm install -g parcel-bundler**
    If any warning to like  Please, upgrade your dependencies to the actual version of core-js@3 displays execute the command below.
    * Command : **npm install --save core-js@^3**
    Now install the parcel-bundler after upgrade and run devproxy.
6. Now launch the app with  Link: [URL for React APP](http://localhost:1234/) from chrome or firefox.
#### Functionality
* Only Admin can add and delete the tours in the app
* An user can login using the data from userTours.json to check the exiting tours schedule the visit

#### Test
Tests are written for login and tours using chai assertions and mocha framework.
* To run the tests user can execute the below commands
    * Command : **mocha test/tourTest**
    * Command : **mocha test/loginTest**
