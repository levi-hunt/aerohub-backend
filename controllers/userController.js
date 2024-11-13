import { Prisma, PrismaClient, roles } from '@prisma/client'
import bcrypt from 'bcryptjs';
import UserService from '../services/UserService.js';
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

// UPDATE Unique User
const updateUser = async (req, res, next) => {
    const currentOrgId = parseInt(req.user.org_id);
    const { user_id } = parseInt(req.params);
    const targetUserId = user_id
    const userData = req.body;

    try {
        const currentUser = await prisma.users.findUnique({
            where: {
                user_id,
                org_id: currentOrgId,
            },
            select: {
                user_id: true,
                role: true
            }
        })

        console.log(currentUser.user_id);
        console.log(targetUserId)
        if (currentUser.user_id != targetUserId) {
            res.status(401).json({ message: "Unauthorized", details: "You're not authorized to make changes to this account." })
        }

    } catch (err) {
        res.status(400).json({ message: "Bad request", details: err.message });
    }

    try {
        const updatedUser = await UserService.updateUser(targetUserId, currentOrgId, userData);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message: "Bad request", details: err.message });
        } else {
            next(err);
        }
    }
}


// DELETE User Unique
const deleteUser = async (req, res, next) => {
    try {
        const org_id = req.user.org_id;
        const { user_id } = req.params
        const deleteUser = await prisma.users.delete({
            where: {
                user_id: parseInt(user_id),
                org_id: parseInt(org_id)
            },
        })

        // Handle no user found
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(204).json({ message: "Deleted", details: `Successfully deleted User ${deleteUser.user_id} ${deleteUser.first_name} ${deleteUser.last_name}.` })
    } catch (err) {
        next(err)
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
                        role: roles.BASE,
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