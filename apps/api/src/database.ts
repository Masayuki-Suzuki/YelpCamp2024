import * as Prisma from '@prisma/client/index'

const { PrismaClient } = Prisma

export const prisma = new PrismaClient()

export const initialiseDatabase = async () => {
    try {
        // Check if database is connected with getting the admin user.
        const users = await prisma.user.findUnique({
            where: {
                email: process.env.ADMIN_EMAIL_ADDRESS
            }
        })

        console.log(users)

        if (users) {
            console.info('Database connected successfully.')
        } else if (users === null) {
            console.info('Dattabase connected but no admin user found.')
            console.info('Please create an admin user.')
            console.info('Note: The admin user email address must be set in the .env file.')
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

