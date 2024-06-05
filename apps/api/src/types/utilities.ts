import { Request, Response, NextFunction } from 'express'

export type Nullable<T> = T | null
export type ExpressFunction = (req: Request, res: Response, next: NextFunction) => void
export type AsyncExpressFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
