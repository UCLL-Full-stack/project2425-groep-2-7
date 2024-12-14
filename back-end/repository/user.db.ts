import { User} from "../model/user";
import { PrismaClient} from "@prisma/client";

const database = new PrismaClient();

const users = [
    new User({
        age: 21,
        name: "Daan Schoenaers",
        country: "Belgium",
        description: "Student",
        email: "daan.schoenaers@gmail.com",
        role: "Player",
        password: "password123",
        favGames: "CS2, RL",
    }),
    new User({
        age: 21,
        name: "Florian Lebrun",
        country: "Belgium",
        description: "Student",
        email: "florian.lebrun@gmail.com",
        role: "Player",
        password: "password123",
        favGames: "CS2, RL",
    }),
    new User({
        age: 21,
        name: "Maxim Delloye",
        country:"Italy",
        description: "Student",
        email: "maxim.delloye@gmail.com",
        role: "Player",
        password: "password123",
        favGames: "CS2, RL",
    }),
    
    new User({
        age: 21,
        name: "Natan Delloye",
        country: "Italy",
        description: "Student",
        email: "natan.delloye@gmail.com",
        role: "Player",
        password: "password123",
        favGames: "CS2, RL",
    })
];

const getAllPlayers = async (): Promise<User[]> => {
    try {
    const userprisma = await database.user.findMany({
        include: { 
            team: true,
            invites: true},
    });
    return userprisma.map((userprisma) => User.from(userprisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addPlayer = (user:User): User => {
    users.push(user);
    return user;
}

export default { getAllPlayers, addPlayer };