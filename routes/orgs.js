// Organisation CRUD Operations

/** @type {import("express").RequestHandler} */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

router.post('/createOrg', async (req, res) => {
    const { name, contact_email } = req.body;
    const createOrg = await prisma.organisations.create({
        data: {
            name,
            contact_email,
        },
    });
    res.json(createOrg);
})

router.get('/:id', async (req, res) => {
    const getOrg = await prisma.organisations.findFirst({
        where: { org_id: Number(req.params.id) }
    })
    res.json(getOrg);
});


module.exports = router;