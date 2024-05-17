import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const initialiseDatabase = async () => {
    try {
        const users = await prisma.user.findMany()
        console.log(users)
        if (users) {
            console.log('Database connected successfully.')
        } else {
            console.log('Database connection error by some reason.')
            prisma.$disconnect()
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Database connection error')
            console.error(error.message)
            prisma.$disconnect()
        }
    }
}

