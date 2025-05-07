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
            where: {
                role: 'Player',
            },
        });
        return userprisma.map((userprisma) => User.from(userprisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPlayerById = async (id: number): Promise<User | undefined> => {
    console.log(id)
    try {
        const userprisma = await database.user.findFirst({
            where: { id },
        });

        if (!userprisma) {
            return undefined;
        }
        return User.from(userprisma);
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
        throw new Error('Datadzadzr. See server log for details.');
    }
};

const storeResetToken = async (email: string, token: string, expires: Date): Promise<void> => {


    await database.user.update({
        where: { email },
        data: { resetToken: token, resetTokenExpires: expires },
    });


};





// repository/user.db.ts





export const findByResetToken = async (


    token: string


): Promise<{ email: string; resetTokenExpires: Date } | null> => {


    const rec = await database.user.findFirst({


        where: { resetToken: token },


        select: { email: true, resetTokenExpires: true },


    });


    // If no record, or expiry is null, bail out


    if (!rec || rec.resetTokenExpires === null) {


        return null;


    }


    // Now TypeScript knows resetTokenExpires is a Date


    return {


        email: rec.email,


        resetTokenExpires: rec.resetTokenExpires,


    };


};





const updatePassword = async (email: string, hashedPassword: string): Promise<void> => {


    await database.user.update({


        where: { email },


        data: { password: hashedPassword },


    });


};





const clearResetToken = async (email: string): Promise<void> => {
    await database.user.update({
        where: { email },
        data: { resetToken: null, resetTokenExpires: null },
    });


};

// Export the updated object
export default { getAllPlayers, addPlayer, getPlayerById, getUserByEmail, storeResetToken, findByResetToken, updatePassword, clearResetToken };
