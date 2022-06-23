require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const orderRouter = require('./routes/order');

app.use(express.json());
app.use('/orders', orderRouter);

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to mongodb'));

app.listen(3000, () => console.log('Server Started'));