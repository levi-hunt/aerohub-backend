import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET all hazards
const hazardGetAll = async (req, res, next) => {
    try {
        const hazardGetAll = await prisma.hazards.findMany({})
        res.json(hazardGetAll)
    } catch (err) {
        next(err)
    }
}

// POST new hazard to database
const createHazard = async (req, res, next) => {
    try {
        const { hazard, description, signoffs_required } = req.body
        const hazardWriteDb = await prisma.hazards.create({
            data: {
                hazard,
                description,
                signoffs_required
            }
        });
        res.json(hazardWriteDb)
    } catch (err) {
        next(err)
    }
}

export default { hazardGetAll, createHazard }