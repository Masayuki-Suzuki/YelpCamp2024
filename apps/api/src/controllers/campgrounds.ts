import { Request, Response } from 'express'
import { prisma } from '../database.js'

export const getAllCmampGrounds = async (req: Request, res: Response) => {
    try {
        const campGrounds = await prisma.campGround.findMany()
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.status(200).json(campGrounds)
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            res.status(500).json(error.message)
        }
    }
}
