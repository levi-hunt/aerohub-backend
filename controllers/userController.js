import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import e from 'express';
const prisma = new PrismaClient()

// GET User Unique
const getUser = async (req, res, next) => {
    try {
        const org_id = req.user.org_id;
        const { user_id } = req.params;
        const getUser = await prisma.users.findUnique({
            where: {
                user_id: Number(user_id),
                org_id
            }
        })
        if (!getUser) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
}

// UPDATE User Unique
const updateUser = async (req, res, next) => {
    try {

    } catch (err) {

    }
}

// DELETE User Unique
const deleteUser = async (req, res, next) => {
    try {

    } catch (err) {

    }
}

// GET All Users
const getAll = async (req, res, next) => {
    try {
        const org_id = req.user.org_id;
        const getAll = await prisma.users.findMany({
            where: {
                org_id
            }
        })
        res.status(200).json(getAll)
    } catch (err) {
        next(err)
    }
}

// CREATE New User
const createUser = async (req, res, next) => {
    const saltRounds = 10;
    try {
        const org_id = req.user.org_id
        const { first_name, last_name, primary_email, password } = req.body;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            try {
                const createUser = await prisma.users.create({
                    data: {
                        first_name,
                        last_name,
                        primary_email,
                        password: hash,
                        org_id
                    }
                })
                res.json(createUser)
            } catch (err) {
                next(err)
            }

        });
    } catch (err) {
        next(err)
    }
}

export default { getUser, getAll, createUser }