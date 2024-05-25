import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { initialiseDatabase } from './database.js'
import { routerConfigs } from './routes/index.js'

dotenv.config()

const app = express()
const { PORT } = process.env

const initServer = async () => {
    const app = express()

    await initialiseDatabase()

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200
    }))

    app.use(express.json())

    routerConfigs(app)

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    }).on('error', (error) => {
        throw new Error(error.message)
    })
}

void initServer()

export const viteNodeApp = app
