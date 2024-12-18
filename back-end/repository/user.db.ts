import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';
import { Role } from '../types/index';

const database = new PrismaClient();

const isPrismaError = (
    error: unknown
): error is {
    code: string;
    meta?: { target?: string[] };
} => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as any).meta?.target
    );
};

const getAllPlayers = async (): Promise<User[]> => {
    try {
        const userprisma = await database.user.findMany({
            include: {
                team: true,
                invites: true,
            },
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
    role?: Role | undefined;
    teamId?: number | null;
}): Promise<User> => {
    try {
        const existingUser = await database.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            throw new Error('A user with this email already exists.');
        }

        const user = new User(userData);

        const createdUser = await database.user.create({
            data: {
                age: user.getAge(),
                name: user.getName(),
                country: user.getCountry(),
                description: user.getDescription(),
                email: user.getEmail(),
                password: user.getPassword(), // Ensure password is hashed before storing
                role: user.getRole(),
                teamId: user.getTeamId() ?? null,
            },
        });

        return User.from(createdUser);
    } catch (error: unknown) {
        if (isPrismaError(error)) {
            const target = error.meta?.target;

            if (error.code === 'P2002' && Array.isArray(target) && target.includes('email')) {
                throw new Error('A user with this email address already exists.');
            }
        }

        console.error('Error adding user to the database:', error);
        throw error;
    }
};

// Add this method
const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userprisma = await database.user.findUnique({
            where: { email },
        });

        return userprisma ? User.from(userprisma) : null;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Database error. See server log for details.');
    }
};

// Export the updated object
export default { getAllPlayers, addPlayer, getUserByEmail };
