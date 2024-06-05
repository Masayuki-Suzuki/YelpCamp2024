import * as Prisma from '@prisma/client/index'
import { User } from '@prisma/client'
import cities, { City } from './cities.js'
import { descriptors, places } from './seedHelpers.js'
import { Campground } from '../src/types/database/campground.js'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const seedImages = [
    'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800',
    'https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?q=800',
    'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?q=800',
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=800',
    'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?q=800',
    'https://images.unsplash.com/photo-1525811902-f2342640856e?q=800',
    'https://images.unsplash.com/photo-1586890662737-9f107825e147?q=800',
    'https://images.unsplash.com/photo-1619677394722-6397960e590b?q=800',
    'https://images.unsplash.com/photo-1488790881751-9068aa742b9b?q=800',
    'https://images.unsplash.com/photo-1524007769096-2dad448565c9?q=800',
    'https://images.unsplash.com/photo-1557292916-eaa52c7e5939?q=800',
    'https://images.unsplash.com/photo-1534187886935-1e1236e856c3?q=800',
    'https://images.unsplash.com/photo-1584345015538-213f90f9ccbc?q=800',
    'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?q=800',
    'https://images.unsplash.com/photo-1594471233145-1e2b579c5e9d?q=800',
    'https://images.unsplash.com/photo-1540329957110-b87b06f5718e?q=800',
    'https://images.unsplash.com/photo-1540329957110-b87b06f5718e?q=800',
    'https://images.unsplash.com/photo-1688380303726-2a3f82354686?q=800',
    'https://plus.unsplash.com/premium_photo-1682094106870-48555b144a59?q=800',
    'https://images.unsplash.com/photo-1688380303719-bf812819080b?q=800',
    'https://images.unsplash.com/photo-1688380303719-bf812819080b?q=800'
]

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

        let testUser: User | null = null

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
            prisma.$disconnect()
            return
        }

        if (testUser) {
            console.info('Found test user...')
            console.log(testUser)

            const id = testUser.id

            console.info('Creating 50 campgrounds...')
            for (let i = 0; i < 50; i++) {
                const random1000 = Math.floor(Math.random() * 1000)
                const cityData: City | undefined = cities[random1000]
                let location = ''

                if (cityData) {
                    location = `${cityData.city}, ${cityData.state}`
                }

                const random20 = Math.floor(Math.random() * 20)
                const image = seedImages[random20] as string

                const campGround: Campground = {
                    location,
                    authorId: id,
                    title: `${getRandomTitle(descriptors)} ${getRandomTitle(places)}`,
                    price: getRandomPrice(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
                        ' incididunt ut labore et dolore magna',
                    image,
                    updatedAt: null,
                    hidden: false
                }
                campGrounds.push(campGround)
            }

            console.info('Pushing campgrounds to database...')

            try {
                const createdCampGrounds = await prisma.campGround.createMany({
                    data: campGrounds
                })

                if (createdCampGrounds) {
                    console.info('Campgrounds created successfully.')
                    console.log(createdCampGrounds)
                } else {
                    console.error(`Error: couldn't update test user with campgrounds seed...`)
                    console.log('Please check seeder code...')
                }
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
        } else {
            console.error('Error: finding test user...')
            console.log('Please check userSeed function ran properly.')

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

userSeed().then(() => {
    void campgroundSeed()
})

console.info('Seeding complete.')
prisma.$disconnect()
