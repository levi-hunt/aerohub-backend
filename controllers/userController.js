import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
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
    const saltRounds = 10;
    const current_oId = req.user.org_id;
    const { user_id } = req.params;
    const { first_name, last_name, primary_email, password } = req.body;

    // Initialize update data object
    const data = {
        ...(first_name !== undefined && { first_name }),
        ...(last_name !== undefined && { last_name }),
        ...(primary_email !== undefined && { primary_email })
    };

    try {
        // Handle password change, if provided
        if (password !== undefined) {
            const hash = await bcrypt.hash(password, saltRounds);
            data.password = hash;
        }

        // Update the user in the database
        const updateUser = await prisma.users.update({
            where: {
                user_id: parseInt(user_id),  // Ensure type safety
                org_id: parseInt(current_oId)
            },
            data
        });

        // Handle no user found
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updateUser);
    } catch (err) {
        if (err instanceof prisma.PrismaClientKnownRequestError) {
            // You can add specific error handling for Prisma errors here
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