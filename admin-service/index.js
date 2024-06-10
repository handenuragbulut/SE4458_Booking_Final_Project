const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sequelize = require('./config/database');
const app = express();
app.use(bodyParser.json());

// Modelleri tanımla
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Room = sequelize.define('room', {
    hotelId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    roomNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    availableFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    availableTo: {
        type: Sequelize.DATE,
        allowNull: false
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// JWT Authentication Middleware
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

// Add Room
app.post('/admin/addRoom', adminAuth, async (req, res) => {
    const room = Room.build(req.body);
    try {
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update Room
app.put('/admin/updateRoom/:id', adminAuth, async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        await room.update(req.body);
        res.send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Admin Service running on port ${process.env.PORT}`);
    });
});
