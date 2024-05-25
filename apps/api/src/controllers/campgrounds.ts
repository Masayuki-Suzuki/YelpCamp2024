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

export const createCampground = async (req: Request, res: Response) => {
    try {
        const { authorId: id, data } = req.body

        // Check authorId user existence
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) {
            const newPost = await prisma.campGround.create({
                data: {
                    ...data,
                    author: {
                        connect: {
                            id
                        }
                    }
                }
            })
            res.status(200).json({
                data: newPost
            })
        } else {
            res.status(404).json({
                message: 'User not found',
                authorId: req.body.authorId
            })
        }
    }
    catch (error) {
        simpleError(res, error)
        res.status(500).json({
            message: 'Internal server error.',
            authorId: req.body.authorId,
            error
        })
    }
}

export const getCampgroundAuthor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const author = await prisma.campGround.findUnique({ where: { id }, include: { author: true } })
        res.status(200).json(author)
    }
    catch (error) {
        simpleError(res, error)
    }
}
