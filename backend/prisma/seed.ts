import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const courseDalum = await prisma.course.upsert({
        where: { name: 'Dalum DiscGolfPark' },
        update: {},
        create: {
            name: 'Dalum DiscGolfPark',
            description: 'Dalum DiscGolfPark is suitable for all players and experience levels. A shorter forest course in beautiful surroundings.',
            layout: 'Gold',
            location: 'Dalum',
            baskets: {
                createMany: {
                    data: [
                        { order: 1, par: 3, length: 67 },
                        { order: 2, par: 3, length: 69 },
                        { order: 3, par: 3, length: 63 },
                        { order: 4, par: 3, length: 77 },
                        { order: 5, par: 3, length: 52 },
                        { order: 6, par: 3, length: 68 },
                        { order: 7, par: 3, length: 88 },
                        { order: 8, par: 3, length: 85 },
                        { order: 9, par: 3, length: 47 },
                        { order: 10, par: 3, length: 85 },
                        { order: 11, par: 4, length: 108 },
                        { order: 12, par: 3, length: 90 },
                    ]
                }
            },
        }
    })
    
    const courseAle = await prisma.course.upsert({
        where: { name: 'Ale Discgolfbana' },
        update: {},
        create: {
            name: 'Ale Discgolfcenter',
            description: 'Stunningly beautiful course, great shot variety required (mix of par 3s, 4s, 5s). Tops of elevation change. Mix of open and tight holes. Clean fairways, well maintained, great flow.',
            location: 'Nol',
            layout: 'White web',
            baskets: {
                createMany: {
                    data: [
                        { order: 1, par: 3, length: 145 },
                        { order: 2, par: 4, length: 173 },
                        { order: 3, par: 3, length: 163 },
                        { order: 4, par: 4, length: 200 },
                        { order: 5, par: 3, length: 92 },
                        { order: 6, par: 3, length: 103 },
                        { order: 7, par: 5, length: 293 },
                        { order: 8, par: 3, length: 132 },
                        { order: 9, par: 3, length: 146 },
                        { order: 10, par: 3, length: 128 },
                        { order: 11, par: 3, length: 84 },
                        { order: 12, par: 4, length: 203 },
                        { order: 13, par: 5, length: 310 },
                        { order: 14, par: 3, length: 109 },
                        { order: 15, par: 4, length: 180 },
                        { order: 16, par: 3, length: 120 },
                        { order: 17, par: 3, length: 110 },
                        { order: 18, par: 4, length: 245 },
                    ]
                }
            }
        },
    })

    console.log({ courseDalum, courseAle })
}


main().then(() => {
    prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})