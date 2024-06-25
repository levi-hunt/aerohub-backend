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
    const saltRounds = 10;

    const current_oId = req.user.org_id;
    const current_uId = req.user.user_id;

    const { user_id } = req.params;
    const { first_name, last_name, primary_email, password } = req.body;

    const data = {}

    if (first_name !== undefined) data.first_name = first_name;
    if (last_name !== undefined) data.last_name = last_name;
    if (primary_email !== undefined) data.primary_email = primary_email;

    try {
        if (password !== undefined) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                try {
                    data.password = hash

                    const updateUser = await prisma.users.update({
                        where: {
                            user_id: Number(user_id),
                            org_id: Number(current_oId)
                        },
                        data
                    })

                    if (!updateUser) {
                        res.status(404).json({ message: "Users not found" });
                    }

                    res.json(updateUser)
                } catch (err) {
                    next(err)
                }
            })
        } else {
            try {
                const updateUser = await prisma.users.update({
                    where: {
                        user_id: user_id,
                        org_id: current_oId
                    },
                    data
                })

                if (!updateUser) {
                    res.status(404).json({ message: "Users not found" });
                }
                res.json(updateUser)
            } catch (err) {
                next(err)
            }
        }
        // Check that current user and updated user are not the same id (cant change permissions for themself)
        // Can change their own password n whatever... dont know how that'll work
        // Check current user org and updated user org are the same so you can't update other organisations users.
    } catch (err) {
        next(err)
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
        if (!getAll) {
            res.status(404).json({ message: "Users not found" });
        }
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

export default { getUser, updateUser, deleteUser, getAll, createUser }