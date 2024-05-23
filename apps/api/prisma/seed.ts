import * as Prisma from '@prisma/client/index'
import { User } from '@prisma/client'
import cities, { City } from './cities.js'
import { descriptors, places } from './seedHelpers.js'
import { Campground } from '../src/types/database/campground.js'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const userSeed = async () => {
    console.log('Seeding user database...')
    try {

        console.info('Finding existing user...')
        const users = await prisma.user.findMany()

        if (users.length) {
            console.info('Reset users...')
            await prisma.user.deleteMany()
        }

        console.info('Creating a new admin user...')
        const adminUser = await prisma.user.create({
            data: {
                nickName: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                email: 'm.suzuki.fp@gmail.com',
                profile: undefined,
                posts: undefined,
                role: 'ADMIN',
                password: 'admin123'
            }
        })
        console.info('Admin user created successfully.')
        console.log(adminUser)

        console.info('Creating a new test user...')
        const user = await prisma.user.create({
            data: {
                nickName: 'testUser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                profile: undefined,
                posts: undefined,
                role: 'USER',
                password: 'test123'
            }
        })
        console.info('Test user created successfully.')
        console.log(user)
        prisma.$disconnect()
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
        } else {
            console.error(e)
        }
        prisma.$disconnect()
    }
}

const campgroundSeed = async () => {
    console.info('Seeding campground database...')

    try {
        const campGroundsData = await prisma.campGround.findMany()

        if (campGroundsData.length) {
            console.info('Reset campgrounds...')
            await prisma.campGround.deleteMany()
        }

        console.info('Creating camp grounds seed data...')

        let campGrounds: Campground[] = []
        const getRandomTitle = (ary: string[]) => ary[Math.floor(Math.random() * ary.length)]
        const getRandomPrice = (min = 10, max = 300) => Math.floor(Math.random() * (max - min + 1) + min)

        console.info('Getting test user...')
        let testUser: User | undefined | null = null

        try {
            testUser = await prisma.user.findUnique({
                where: {
                    email: 'test@example.com'
                }
            })
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            } else {
                console.error(e)
            }
        }

        console.info('Found test user...')
        console.log(testUser)

        console.info('Creating 50 campgrounds...')
        for (let i = 0; i < 50; i++) {
            const random1000 = Math.floor(Math.random() * 1000)
            const authorId = testUser ? testUser.id : null

            const cityData: City | undefined = cities[random1000]

            let location = ''

            if (cityData) {
                location = `${cityData.city}, ${cityData.state}`
            }

            const campGround: Campground = {
                location,
                authorId,
                title: `${getRandomTitle(descriptors)} ${getRandomTitle(places)}`,
                price: getRandomPrice(),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
                    ' incididunt ut labore et dolore magna',
                image: 'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800'
            }
            campGrounds.push(campGround)
        }

        console.info('Pushing campgrounds to database...')
        try {
            const createdCampGrounds = await prisma.campGround.createMany({
                data: campGrounds
            })

            console.info('Campgrounds created successfully.')
            console.log(createdCampGrounds)
        }
        catch (e) {
            console.error('Error creating campgrounds...')
            if (e instanceof Error) {
                console.error(e.message)
            } else {
                console.error(e)
            }

            console.info('Disconnecting from database...')
            prisma.$disconnect()
        }

    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
        } else {
            console.error(e)
        }
        prisma.$disconnect()
    }
}

void userSeed()
void campgroundSeed()

console.info('Seeding complete.')
prisma.$disconnect()
