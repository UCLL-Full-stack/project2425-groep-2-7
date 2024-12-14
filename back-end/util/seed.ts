import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.invite.deleteMany();
    await prisma.team.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.user.deleteMany();

    const team1 = await prisma.team.create({
        data: {
            name: 'ProPlayers',
             country: 'Belgium',
        }
    })

    const team2 = await prisma.team.create({
        data: {
            name: 'NoobPlayers',
             country: 'Belgium',
        }
    })


    const tournament1 = await prisma.tournament.create({
        data: {
            name: "Pro League",
             location: "Belgium, Antwerp",
              game: "CS2",
              teams: {
                connect: [
                    {id: team1.id},
                    {id: team2.id},
                ]    
              }
        }
    })

    const tournament2 = await prisma.tournament.create({
        data: {
            name: "Amateur League",
             location: "Belgium, Brussels",
              game: "LOL",
              teams: {
                connect: [
                    {id: team2.id},
                ]
              }
            }
        })
    

    const user1 = await prisma.user.create({
        data: {
            age: 21,
            name: "Daan Schoenaers",
            country: "Belgium",
            description: "Student",
            email: "daan.schoenaers@gmail.com",
            role: "Player",
            password: "password123",
            favGames: "CS2, RL",
            team: {
                connect: {
                    id: team1.id, // Connect the user to the team with ID 1
                },
            },
        }
        
    });

    const user2 = await prisma.user.create({
        data: {
            age: 21,
            name: "Florian Lebrun",
            country: "Belgium",
            description: "Student",
            email: "florian.lebrun@gmail.com",
            role: "Player",
            password: "password123",
            favGames: "CS2, RL",
            team: {
                connect: {
                    id: team1.id, 
                },
            },
        }
    });

    const user3 = await prisma.user.create({
        data: {
            age: 21,
            name: "Maxim Delloye",
            country:"Italy",
            description: "Student",
            email: "maxim.delloye@gmail.com",
            role: "Player",
            password: "password123",
            favGames: "CS2, RL",
            team: {
                connect: {
                    id: team2.id, // Connect the user to the team with ID 1
                },
            },
        }
    });

    const user4 = await prisma.user.create({
        data: {
            age: 21,
            name: "Natan Delloye",
            country: "Italy",
            description: "Student",
            email: "natan.delloye@gmail.com",
            role: "Player",
            password: "password123",
            favGames: "CS2, RL",
            team: {
                connect: {
                    id: team2.id, // Connect the user to the team with ID 1
                },
            },
    }
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
