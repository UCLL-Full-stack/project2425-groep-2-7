import { User} from "../model/user";
import { PrismaClient} from "@prisma/client";
import { Role } from "../types/index"
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
    }),
    new User({
        age: 21,
        name: "Florian Lebrun",
        country: "Belgium",
        description: "Student",
        email: "florian.lebrun@gmail.com",
        role: "Player",
        password: "password123",
    }),
    new User({
        age: 21,
        name: "Maxim Delloye",
        country:"Italy",
        description: "Student",
        email: "maxim.delloye@gmail.com",
        role: "Player",
        password: "password123",
    }),
    
    new User({
        age: 21,
        name: "Natan Delloye",
        country: "Italy",
        description: "Student",
        email: "natan.delloye@gmail.com",
        role: "Player",
        password: "password123",
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

const addPlayer = async (userData: {
    age: number;
    name: string;
    country: string;
    description: string;
    email: string;
    password: string; 
    role: Role;
    teamId?: number | null;
}): Promise<User> => {
    try {
        // Create a new User instance
        const user = new User(userData);

        // Persist the user to the database
        const createdUser = await database.user.create({
            data: {
                age: user.getAge(),
                name: user.getName(),
                country: user.getCountry(),
                description: user.getDescription(),
                email: user.getEmail(),
                password: user.getPassword(), // Ensure password is hashed before storing
                role: user.getRole(),
                teamId: user.getTeamId() ?? null, // Convert undefined to null if necessary
            },
        });

        // Return the User instance
        return User.from(createdUser);
    } catch (error) {
        console.error('Error adding user to the database:', error);
        throw error;
    }
};

export default { getAllPlayers, addPlayer };