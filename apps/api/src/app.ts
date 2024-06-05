import express from 'express'
import dotenv from 'dotenv'
import { initialiseDatabase } from './database.js'
import { serverConfig } from './server-config.js'

dotenv.config()

const app = express()
const { PORT } = process.env

const initServer = async () => {
    const app = express()

    await initialiseDatabase()
    serverConfig(app)

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    }).on('error', (error) => {
        throw new Error(error.message)
    })
}

void initServer()
