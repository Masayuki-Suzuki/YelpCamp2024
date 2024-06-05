import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { AppError, simpleError } from './utilities/errorHandlingHelper.js'
import { routerConfigs } from './routes/index.js'

export const serverConfig = (app: Express) => {
    app.use(morgan('dev'))
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200
    }))
    app.use(express.json())

    routerConfigs(app)

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const { status = 500, message = 'Internal Server Error' } = err
        res.status(status).json({
            message,
            error: err
        })
        next()
    })
}

export default serverConfig
