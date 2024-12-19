import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { error } from 'console';

const getAllPlayers = async (): Promise<User[]> => {
    const users = await userDb.getAllPlayers();
    if (users.length == 0) {
        throw new Error('No players found');
    }
    return users;
};
const addPlayer = async ({
    age,
    name,
    country,
    description,
    email,
    password,
}: UserInput): Promise<User> => {
    const player = new User({ age, name, country, description, email, password, role: 'Player' });

    const players = await getAllPlayers();
    for (const existingPlayer of players) {
        if (existingPlayer.equals(player.toPlainObject())) {
            throw new Error('Player already exists');
        }
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    console.log('Hashed password:', hashedpassword);

    const hasheduser = new User({
        age,
        name,
        country,
        description,
        email,
        password: hashedpassword,
        role: 'Player',
    });
    console.log('User object before saving:', hasheduser.toPlainObject());

    return userDb.addPlayer(hasheduser.toPlainObject());
};

const getUserByEmail = async ( email: string ): Promise<User> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email: ${email} does not exist`);
    }
    return user;
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email );

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('incorrect password.');
    }
    return {
        token: generateJwtToken({ email, role: user.getRole() as Role }),
        email,
    };
};

const getPlayerById = async (playerId: number): Promise<User> => {
    const user = await userDb.getPlayerById(playerId);
    if (user === undefined) {
        throw new Error(`Player with id ${playerId} not found`);
    }
    return user;
};


export default { getAllPlayers, addPlayer, getUserByEmail, authenticate, getPlayerById };
