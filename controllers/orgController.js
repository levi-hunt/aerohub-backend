import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const orgWriteDb = async (req, res) => {
    const { name, contact_email } = req.body
    const writeDb = await prisma.organisations.create({
        data: {
            name,
            contact_email
        }
    });
    res.json(writeDb)
}

export default orgWriteDb