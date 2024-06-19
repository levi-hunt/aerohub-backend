// Organisation CRUD Operations

/** @type {import("express").RequestHandler} */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

/**
 * @swagger
 *  tags:
 *      name: Organisation
 *      description: All CRUD operations that can be performed on the orgs table.
 */


/**
 * @swagger
 * /org/createOrg:
 *  post:
 *      summary: Create a new organisation
 *      description: Creates a new organisation with an org id, name and contact email
 *      tags:
 *          - Organisation
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Aviarc
 *                          contact_email:
 *                              type: string
 *                              example: levihunt@proton.me
 *                      required:
 *                          - name
 *                          - contact_email
 *      responses:
 *          201:
 *              description: Organisation created successfully
 *          400:
 *              description: Invalid Input
 *          500:
 *              description: Internal Server Error
 *              
 */
router.post('/createOrg', async (req, res) => {
    // Add validation middleware    
    const { name, contact_email } = req.body;
    const createOrg = await prisma.organisations.create({
        data: {
            name,
            contact_email,
        },
    });
    res.json(createOrg);
})

/**
 * @swagger
 * /org/{org_id}:
 *   get:
 *      tags: 
 *          - Organisation
 *      summary: Returns org id
 *      responses:
 *          200:
 *              description: Successfully printed "The org at id {org_id}"
 *      parameters:
 *          - name: org_id
 *            in: path
 *            schema:
 *              type: integer
 *            required: true
 *            description: Org Iid
 */
router.get('/:id', async (req, res) => {
    const getOrg = await prisma.organisations.findFirst({
        where: { org_id: Number(req.params.id) }
    })
    res.json(getOrg);
});


module.exports = router;