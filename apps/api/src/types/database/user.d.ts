import { User } from '@prisma/client'

export type User = Omit<User, 'id'>
