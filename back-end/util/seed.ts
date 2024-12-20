import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.invite.deleteMany();
    await prisma.team.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.user.deleteMany();


    const user1hashedpassword = await bcrypt.hash("user1", 12)
    const user1 = await prisma.user.create({
        data: {
            age: 25,
            name: "Tester1",
            country: "Belgium",
            description: "Student",
            email: "tester1@mail.com",
            role: "Player",
            password: user1hashedpassword,            
        }
        
    });
    const user2hashedpassword = await bcrypt.hash("user2", 12);
    const user2 = await prisma.user.create({
        data: {
            age: 30,
            name: "Tester2",
            country: "France",
            description: "Coaching",
            email: "tester2@mail.com",
            role: "Coach",
            password: user2hashedpassword,            
        }
    });

    const user3hashedpassword = await bcrypt.hash("user3", 12 )
    const user3 = await prisma.user.create({
        data: {
            age: 47,
            name: "Tester3",
            country:"Italy",
            description: "Just enjoying life",
            email: "tester3@mail.com",
            role: "Player",
            password: user3hashedpassword,
        }
    });
    const user4hashedpassword = await bcrypt.hash("user4", 12 )
    const user4 = await prisma.user.create({
        data: {
            age: 18,
            name: "tester4",
            country: "Netherlands",
            description: "Student",
            email: "tester4@mail.com",
            role: "Player",
            password: user4hashedpassword,
        }
    });

    const team1 = await prisma.team.create({
        data: {
            name: 'ProPlayers',
            country: 'Belgium',
            players: {
                connect: [{ id: user2.id }],
            },
        },
    });

    const team2 = await prisma.team.create({
        data: {
            name: 'NoobPlayers',
            country: 'Belgium',
            players: {
                connect: [{ id: user3.id }, { id: user4.id }],
            },
        },
    });

    const tournament1 = await prisma.tournament.create({
        data: {
            name: 'Pro League',
            location: 'Belgium, Antwerp',
            game: 'CS2',
            teams: {
                connect: [{ id: team1.id }, { id: team2.id }],
            },
        },
    });

    const tournament2 = await prisma.tournament.create({
        data: {
            name: 'Amateur League',
            location: 'Belgium, Brussels',
            game: 'LOL',
            teams: {
                connect: [{ id: team2.id }],
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
