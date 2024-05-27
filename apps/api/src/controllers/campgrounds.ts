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

export const updateCampground = async (req: Request, res: Response) => {
    try {
        const { data, postId: id } = req.body

        const post = await prisma.campGround.findUnique({
            where: {
                id
            }
        })

        if (post) {
            res.status(200).json({
                data: {
                    post,
                    sentData: data
                },
                message: `Post hasn't been updated yet because of testing.`
            })
        } else {
            res.status(404).json({
                message: 'Post not found',
                postID: id,
                data: post
            })
        }

    }
    catch (error) {
        simpleError(res, error)
    }
}

export const getCampgroundAuthor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await prisma.campGround.findUnique({ where: { id }, include: { author: true } })

        if (post) {
            if (post.author) {
                res.status(200).json(post.author)
            } else {
                res.status(404).json({
                    message: `Post author not found and/or Campground doesn't have an author.`,
                    data: post
                })
            }
        } else {
            res.status(404).json({
                message: 'Post not found',
                data: post
            })
        }
    }
    catch (error) {
        simpleError(res, error)
    }
}
