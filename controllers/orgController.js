import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const orgGetAll = async (req, res, next) => {
    try {
        const orgGetAll = await prisma.organisations.findMany({})
        res.json(orgGetAll)
    } catch (err) {
        next(err)
    }
}

const orgWriteDb = async (req, res, next) => {
    try {
        const { name, contact_email } = req.body
        const orgWriteDb = await prisma.organisations.create({
            data: {
                name,
                contact_email
            }
        });
        res.json(orgWriteDb)
    } catch (err) {
        next(err)
    }
}

const orgGetUnique = async (req, res, next) => {
    try {
        const { org_id } = req.params
        const orgGetUnique = await prisma.organisations.findUnique({
            where: {
                org_id: Number(org_id),
            },
        })
        if (orgGetUnique === null) {
            res.status(404).json({ message: "Organisation not found" });
        }
        res.json(orgGetUnique)
    } catch (err) {
        next(err)
    }
}

export default { orgWriteDb, orgGetAll, orgGetUnique }