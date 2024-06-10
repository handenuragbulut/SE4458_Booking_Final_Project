const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

const Booking = mongoose.model('Booking', new mongoose.Schema({
    userId: String,
    roomId: String,
    startDate: Date,
    endDate: Date,
}));

app.post('/book', async (req, res) => {
    const { userId, roomId, startDate, endDate } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
        return res.status(404).send({ error: 'Room not found' });
    }
    if (room.capacity <= 0) {
        return res.status(400).send({ error: 'Room not available' });
    }
    const booking = new Booking({ userId, roomId, startDate, endDate });
    await booking.save();
    room.capacity -= 1;
    await room.save();
    res.status(201).send(booking);
});

app.listen(process.env.PORT, () => {
    console.log(`Booking Service running on port ${process.env.PORT}`);
});
