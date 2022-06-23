const express = require('express');
const router = express.Router();

const Orders = require('../models/order');
router.get('/', (req, res) => {
    console.log('hi');
});

module.exports = router;

