This is a booking hotel project

4 services were used: admin, booking, notification, search.

Certainly! Here's a concise explanation with added technical details:

1. **Admin Service**: This component manages administrative functionalities such as adding and updating hotel rooms. It utilizes technologies like Express for handling HTTP requests, Sequelize for database ORM (Object-Relational Mapping) operations, and JWT (JSON Web Tokens) for user authentication. Sequelize synchronizes with the database using `sequelize.sync()` to ensure that the defined models (`User` and `Room`) are reflected as tables in the database. Endpoints like `/admin/addRoom` and `/admin/updateRoom/:id` are secured with JWT-based authentication through the `adminAuth` middleware.

2. **API Gateway**: This module serves as a gateway for client requests to interact with the hotel reservation system. It is built using Express for handling HTTP requests, Mongoose for MongoDB ODM (Object-Document Mapping), and middleware like Body Parser for parsing JSON data. The connection to the MongoDB database is established using `mongoose.connect()` with the provided URL from the `.env` file. The `Room` schema defines the structure of hotel rooms, and the `Room` model is created using `mongoose.model()` to interact with the MongoDB collection. JWT-based authentication is implemented for administrative operations through the `adminAuth` middleware. The API provides endpoints like `/admin/addRoom` and `/admin/updateRoom/:id` for adding and updating rooms, respectively.

3. **Booking Service**: This service handles the booking process for hotel rooms. It is implemented using Express for creating an HTTP server, mysql for database operations, and sql for defining schemas and models. The `Room` and `Booking` models represent hotel rooms and bookings, respectively. The `/book` endpoint allows users to make bookings by sending a POST request with the necessary details like `userId`, `roomId`, `startDate`, and `endDate`. The service checks room availability and updates room capacity upon successful bookings.

4. **Notification Service**: This service sends notifications to administrators about rooms with low capacity. It is built using Express for creating an HTTP server, Mongoose for MongoDB operations, and Node-Cron for scheduling tasks. The `cron.schedule()` function schedules a task to run at midnight (`'0 0 * * *'`) every day to check for rooms with a capacity lower than 20. If such rooms are found, notifications are logged to the console.

5. **Search Service**: This service enables clients to search for available hotel rooms based on criteria like destination, date range, and the number of people. It is implemented using Express for handling HTTP requests, Mongoose for MongoDB interactions, and middleware like Body Parser for parsing request data. The `/hotels/search` endpoint allows clients to send a GET request with query parameters like `destination`, `startDate`, `endDate`, and `people` to search for available rooms. The service queries the database to find rooms that match the specified criteria and returns the results to the client.

Overall, these services collectively form a robust hotel reservation system, encompassing administrative functionalities, user bookings, capacity monitoring, and hotel room searching capabilities.
