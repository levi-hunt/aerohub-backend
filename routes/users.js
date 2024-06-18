// User CRUD Operations

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: All CRUD operations that can be performed on the users table.
 */

/**
 * @swagger
 * /user/getUser:
 *   get:
 *      tags: 
 *          - Users
 *      summary: Returns 'Hello World'
 *      responses:
 *          200:
 *              description: Successfully returned the 'Hello World' text
 */
router.get('/getUser', (req, res) => {
    res.send("Hello World")
});


module.exports = router;