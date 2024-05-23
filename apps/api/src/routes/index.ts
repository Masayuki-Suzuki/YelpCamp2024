import { Express } from 'express'
import campgroundsRouter from './campgrounds.js'

export const routerConfigs = (app: Express) => {
    app.use('/campgrounds', campgroundsRouter)

    app.get('/', (req, res) => {
        res.status(200).send('<h1>Hello World</h1>')
    })
}
