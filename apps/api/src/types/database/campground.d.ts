import { CampGround } from '@prisma/client'

export type Campground = Omit<CampGround, 'id'>
