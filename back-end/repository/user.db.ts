import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';
import { Role } from '../types/index';
const database = new PrismaClient();


const getAllPlayers = async (): Promise<User[]> => {
    try {
        const userprisma = await database.user.findMany({
            select: {
                id: true, // Ensure the `id` is explicitly included
                name: true,
                email: true,
                age: true,
                country: true,
                description: true,
                role: true,
                team: true,
                invites: true,
                password: true,
                teamId: true,
            },
        });
        return userprisma.map((userprisma) => User.from(userprisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPlayerById = async (id: number): Promise<User | undefined> => {
    try { 
        const userprisma = await database.user.findFirst({
            where: {id},
        });
    
    if (!userprisma) {
        return undefined;
    }
    return User.from(userprisma)
    } catch (error) {
        console.error('Error fetching user from the database:', error);
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
    role?: Role | undefined;
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

export default { getAllPlayers, addPlayer, getPlayerById };
