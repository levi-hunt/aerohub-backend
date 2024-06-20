// routes/org.js
const express = require('express');
const router = express.Router();

// Define your organization routes here
router.get('/', (req, res) => {
    res.send('Organization route');
});

module.exports = router;
