import { Request, Response } from 'express'
import { prisma } from '../database.js'
import { AppError } from '../utilities/errorHandlingHelper.js'

export const getAllCampGrounds = async (req: Request, res: Response) => {
    const campGrounds = await prisma.campGround.findMany({
        where: {
            hidden: false
        }
    }).catch((err) => {
        console.log(err)
        throw new AppError('Campgrounds not found.', 404)
    })

    if (!campGrounds) {
        throw new AppError('Campgrounds not found.', 404)
    }

    res.status(200).json(campGrounds)
}

export const getOneCampGround = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new AppError('Post ID is required.', 400)
    }

    const campGround = await prisma.campGround.findUnique({
        where: {
            id,
            hidden: false
        }
    }).catch((err) => {
        console.log(err)
        throw new AppError('Campground not found.', 404)
    })

    if (!campGround) {
        throw new AppError('Campground not found.', 404)
    }

    res.status(200).json(campGround)
}

export const createCampground = async (req: Request, res: Response) => {
    const { authorId: id, data } = req.body

    if (!id) {
        throw new AppError('Post ID is required.', 400)
    }

    if (!data) {
        throw new AppError('Post data is required.', 400)
    }

    // Check authorId user existence
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    }).catch((err) => {
        console.log(err)
        throw new AppError('User not authorised.', 401)
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
        throw new AppError('User not authorised.', 401)
    }
}

export const updateCampground = async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params

    if (!id) {
        throw new AppError('Post ID is required.', 400)
    } else if (!(/^[0-9a-f]{12}$/i.test(id))) {
        throw new AppError('Provided ID representation must be hex string and exactly 12 bytes/character.', 400)
    }

    const post = await prisma.campGround.findUnique({
        where: {
            id
        }
    }).catch((err) => {
        console.log(err)
        throw new AppError('Post not found.', 404)
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
        throw new AppError('Post not found.', 404)
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
                message: `Post deleted successfully.`
            })
        } else {
            throw new AppError('Post not found.', 404)
        }
    } else {
        throw new AppError('Post ID is required.', 400)
    }
}

export const getCampgroundAuthor = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new AppError('Post ID is required.', 400)
    }

    const post = await prisma.campGround.findUnique({ where: { id }, include: { author: true } })

    if (post) {
        if (post.author) {
            res.status(200).json(post.author)
        } else {
            throw new AppError(`Post author not found and/or Campground doesn\'t have an author.`, 404)
        }
    } else {
        throw new AppError('Post not found.', 404)
    }

}
