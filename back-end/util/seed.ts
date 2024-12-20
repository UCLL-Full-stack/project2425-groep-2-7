import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.invite.deleteMany();
    await prisma.team.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            age: 25,
            name: "Tester1",
            country: "Belgium",
            description: "Student",
            email: "tester1@mail.com",
            role: "Player",
            password: "tester1",            
        }
        
    });
    const user2 = await prisma.user.create({
        data: {
            age: 30,
            name: "Tester2",
            country: "France",
            description: "Coaching",
            email: "tester2@mail.com",
            role: "Coach",
            password: "tester2",            
        }
    });

    const user3 = await prisma.user.create({
        data: {
            age: 47,
            name: "Tester3",
            country:"Italy",
            description: "Just enjoying life",
            email: "tester3@mail.com",
            role: "Player",
            password: "tester3",
        }
    });

    const user4 = await prisma.user.create({
        data: {
            age: 18,
            name: "tester4",
            country: "Netherlands",
            description: "Student",
            email: "tester4@mail.com",
            role: "Player",
            password: "tester4",
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
