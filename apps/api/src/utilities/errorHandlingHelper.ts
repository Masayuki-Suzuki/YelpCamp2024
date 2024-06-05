import { NextFunction, Response, Request } from 'express'
import { AsyncExpressFunction, ExpressFunction, Nullable } from '../types/utilities.js'

export class AppError extends Error {
    status: number

    constructor(message: string, status: number = 500) {
        super()
        this.message = message
        this.status = status
    }
}

export const simpleError = (res: Response, error: any, next: Nullable<NextFunction>) => {
    if (error instanceof Error) {
        console.error(error.message)
        res.status(500).json(error.message)
    } else {
        res.status(500).json(error)
    }
    if (next) {
        next()
    }
}

export const catchAsync = (fn: AsyncExpressFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}
