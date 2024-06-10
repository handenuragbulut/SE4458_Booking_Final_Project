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

app.get('/hotels/search', async (req, res) => {
    const { destination, startDate, endDate, people } = req.query;
    // Assuming we have destination field in Room
    const rooms = await Room.find({
        destination,
        availableFrom: { $lte: new Date(startDate) },
        availableTo: { $gte: new Date(endDate) },
        capacity: { $gte: people }
    });
    res.send(rooms);
});

app.listen(process.env.PORT, () => {
    console.log(`Search Service running on port ${process.env.PORT}`);
});
