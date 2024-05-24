import { Response } from 'express'

export const simpleError = (res: Response, error: any) => {
    if (error instanceof Error) {
        console.error(error.message)
        res.status(500).json(error.message)
    } else {
        res.status(500).json(error)
    }
}
