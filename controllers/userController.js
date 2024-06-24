import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET User Unique
const getUser = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const getUser = await prisma.users.findUnique({
            where: {
                user_id: Number(user_id)
            }
        })
        res.status(200).json(getUser)
    } catch (err) {

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
        const getAll = await prisma.users.findMany({})
        res.status(200).json(getAll)
    } catch (err) {
        next(err)
    }
}

// CREATE New User
const createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, primary_email, password, org_id } = req.body
        const createUser = await prisma.users.create({
            data: {
                first_name,
                last_name,
                primary_email,
                password,
                org_id
            }
        })
        res.json(createUser)
    } catch (err) {
        next(err)
    }
}

export default { getAll, createUser }