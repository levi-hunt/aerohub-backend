// User CRUD Operations

/** @type {import("express").RequestHandler} */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: All CRUD operations that can be performed on the users table.
 */


/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the given first name, last name, and email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               primary_email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                  type: string
 *                  example: Aerohub123
 *             required:
 *               - first_name
 *               - last_name
 *               - primary_email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *      tags: 
 *          - Users
 *      summary: Returns user id
 *      responses:
 *          200:
 *              description: Successfully printed "Your id is {id}"
 *      parameters:
 *          - name: userId
 *            in: path
 *            schema:
 *              type: integer
 *            required: true
 *            description: User Id
 */
router.get('/:id', async (req, res) => {
    const getUser = await prisma.users.findFirst({
        where: { user_id: Number(req.params.id) }
    })
    res.json(getUser);
});


module.exports = router;