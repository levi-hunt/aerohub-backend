// User CRUD Operations

/** @type {import("express").RequestHandler} */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

router.post('/createUser', async (req, res) => {
    const { first_name, last_name, primary_email, password } = req.body;

    // Validate input
    if (!first_name || !last_name || !primary_email || !password) {
        return res.status(400).send('Invalid input');
    }

    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with the hashed password
        const createUser = await prisma.users.create({
            data: {
                first_name,
                last_name,
                primary_email,
                password: hashedPassword,
            },
        });

        res.json(createUser);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.get('/:id', async (req, res) => {
    const getUser = await prisma.users.findFirst({
        where: { user_id: Number(req.params.id) }
    })
    res.json(getUser);
});


module.exports = router;