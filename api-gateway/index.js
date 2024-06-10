const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // .env dosyasını yükler

const app = express();
app.use(bodyParser.json());

// Veritabanına bağlan
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Oda şeması
const roomSchema = new mongoose.Schema({
    hotelId: String,
    roomNumber: String,
    availableFrom: Date,
    availableTo: Date,
    capacity: Number,
});

const Room = mongoose.model('Room', roomSchema);

// Admin Middleware for JWT authentication
const adminAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        req.admin = decoded;
        next();
    });
};

// Oda Ekle
app.post('/admin/addRoom', adminAuth, async (req, res) => {
    const room = new Room(req.body);
    try {
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Oda Güncelle
app.put('/admin/updateRoom/:id', adminAuth, async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Admin Service running on port ${process.env.PORT}`);
});
