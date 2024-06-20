// routes/org.js
const express = require('express');
const router = express.Router();

router.route('/:id')
    .get(async (req, res) => {
        res.send("Single org ID here");
    })
    .put(async (req, res) => {
        res.send("This updates an unique org");
    })
    .delete(async (req, res) => {
        res.send("This will delete an unique org");
    })

router.route('/')
    .get(async (req, res) => {
        res.send("Returns every org");
    })
    .post(async (req, res) => {
        res.send("This creates an org");
    })

module.exports = router;
