import express from 'express'
import dotenv from 'dotenv'
import { initialiseDatabase } from './database.js'

dotenv.config()

const app = express()
const { PORT } = process.env

app.get('/', (req, res) => {
    res.status(200).send('Hello World!!')
})

const initServer = async () => {
    await initialiseDatabase()

    app.get('/', (req, res) => {
        res.status(200).send('Hello World!')
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`)
    }).on('error', (error) => {
        throw new Error(error.message)
    })
}

if (import.meta.env.PROD) {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!!`)
    })
}

export const viteNodeApp = app
