const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Room = mongoose.model('Room', new mongoose.Schema({
    hotelId: String,
    roomNumber: String,
    availableFrom: Date,
    availableTo: Date,
    capacity: Number,
}));

// Scheduled task to check room capacity
cron.schedule('0 0 * * *', async () => {
    const rooms = await Room.find({ capacity: { $lt: 20 } });
    rooms.forEach(room => {
        console.log(`Notify admin: Room ${room.roomNumber} has low capacity`);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Notification Service running on port ${process.env.PORT}`);
});
