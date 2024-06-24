import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import jwtAuth from '../utils/jwt.js'
const prisma = new PrismaClient()

const loginAuth = async (req, res, next) => {
    try {
        const { primary_email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                primary_email: primary_email
            }
        })

        if (!user) return res.status(400).send("Incorrect email or password.");

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(400).send("Incorrect email or password.");

        const token = jwtAuth.genAuthToken(user)
        res.json(token)
    } catch (err) {
        next(err)
    }
}

export default { loginAuth }