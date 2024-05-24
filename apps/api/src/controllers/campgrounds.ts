import { Request, Response } from 'express'
import { prisma } from '../database.js'
import { simpleError } from '../utilities/errorHandlingHelper.js'

export const getAllCmampGrounds = async (req: Request, res: Response) => {
    try {
        const campGrounds = await prisma.campGround.findMany()
        res.status(200).json(campGrounds)
    }
    catch (error) {
        simpleError(res, error)
    }
}

export const getOneCampGround = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const campGround = await prisma.campGround.findUnique({
            where: {
                id
            }
        })
        console.log(campGround)
        res.status(200).json(campGround)
    }
    catch (error) {
        simpleError(res, error)
    }
}
