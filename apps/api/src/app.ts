import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const { PORT } = process.env

app.get('/', (req, res) => {
  res.status(200).send('Hello World!!!')
})

if(import.meta.env.PROD) {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!!`)
    })
}

export const viteNodeApp = app
