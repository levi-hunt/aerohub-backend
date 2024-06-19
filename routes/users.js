// User CRUD Operations

/** @type {import("express").RequestHandler} */

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

router.param('id', (req, res, next, id) => {
    req.id = id;
    next();
})

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
router.get('/:id', (req, res) => {
    res.send(`Your id is ${req.id}`);
    res.end();
});


module.exports = router;