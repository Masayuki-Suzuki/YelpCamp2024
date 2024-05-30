import { Request, Response } from 'express'
import { prisma } from '../database.js'
import { simpleError } from '../utilities/errorHandlingHelper.js'

export const getAllCampGrounds = async (req: Request, res: Response) => {
    try {
        const campGrounds = await prisma.campGround.findMany({
            where: {
                hidden: false
            }
        })
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
                id,
                hidden: false
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
            res.status(200).json(newPost)
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
        const data = req.body
        const { id } = req.params

        const post = await prisma.campGround.findUnique({
            where: {
                id
            }
        })

        if (post) {
            const UTCTime = new Date().toUTCString()
            const ISOTime = new Date(UTCTime).toISOString()

            const updatedPost = await prisma.campGround.update({
                where: {
                    id
                },
                data: {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    location: data.location,
                    image: data.image,
                    updatedAt: ISOTime
                }
            })

            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({
                message: 'Post not found',
                postID: id,
                post,
                status: 404
            })
        }

    }
    catch (error) {
        simpleError(res, error)
    }
}

export const deleteCampground = async (req: Request, res: Response) => {
    let id: string | undefined

    if ('id' in req.body) {
        id = req.body.id
    } else {
        id = req.params.id
    }

    if (id) {
        const post = await prisma.campGround.findUnique({
            where: {
                id
            }
        })

        if (post) {
            const deletedPost = await prisma.campGround.update({
                where: {
                    id
                },
                data: {
                    hidden: true
                }
            })

            res.status(200).json({
                post: deletedPost,
                message: `Post deleted successfully. (Note: It's Soft Delete.)`
            })
        } else {
            res.status(404).json({
                message: 'Post not found',
                post
            })
        }
    } else {
        res.status(404).json({
            message: 'Post not found',
            postID: id
        })
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
                    post
                })
            }
        } else {
            res.status(404).json({
                message: 'Post not found',
                post
            })
        }
    }
    catch (error) {
        simpleError(res, error)
    }
}
