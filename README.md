This is a booking hotel project

4 services were used: admin, booking, notification, search.

admin-service;
In this file, an Express application has been created and secured with JWT-based authentication. Here are the important points in the file:

The required modules were obtained with the require function: express, body-parser, jsonwebtoken, bcryptjs and dotenv. These modules were used for functions such as building the Express application, processing requests, and authentication.

A database connection was established using Sequelize and two models named User and Room were defined. These models represent user and room information and form tables in the database.

An authentication middleware called adminAuth has been defined. This middleware provides JWT-based authentication. When a request is made, this middleware verifies the user's credentials and performs authorization operations.

Endpoints such as /admin/addRoom and /admin/updateRoom/:id are defined. These endpoints allow adding a new room and updating an existing room respectively. These operations can be performed by users with administrative privileges, and therefore the adminAuth middleware has been added to these endpoints.

The application has been initialized. Using the sequelize.sync() method, the database was synchronized and the application started listening on a specific port.

api-gateway
This code creates a Node.js application and provides the API for a hotel reservation system using a MongoDB database. Its functionality can be explained as follows:

Importing Modules: Necessary modules such as express, mongoose, body-parser, jsonwebtoken, bcryptjs and dotenv are being imported. These are used to create the Express application, connect to the MongoDB database, provide JWT-based authentication, and load the .env file.

Creating the Express Application: An Express application is created with the express() function. By using body-parser, incoming requests are processed in JSON format.

MongoDB Database Connection: Connecting to the MongoDB database with the mongoose.connect() function. The link URL is taken from the .env file.

Defining the Room Schema: Creating a roomSchema for MongoDB. This diagram describes the features of hotel rooms.

Creating the Room Model: A model named Room is created with mongoose.model(). This model is associated with the "Room" collection in MongoDB.

Admin Authentication Middleware: A middleware named adminAuth is defined. This middleware does JWT-based authentication and checks if you have administrative rights.

Room Add and Update Endpoints: Endpoints such as /admin/addRoom and /admin/updateRoom/:id are defined. These endpoints allow adding a new room and updating an existing room respectively. These operations can be performed by users with administrative privileges, and therefore the adminAuth middleware has been added to these endpoints.

Starting the Application: With the app.listen() function, the application starts listening on a specific port. The port number is taken from the .env file.

This code creates an API for a hotel reservation system using MongoDB. The administrator authenticates and allows adding new rooms and updating existing rooms.
