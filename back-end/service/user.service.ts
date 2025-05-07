import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import * as Sentry from "@sentry/node"; 
import { sendMail } from '../util/mailer';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';

const getAllPlayers = async (): Promise<object[]> => {
    const users = await userDb.getAllPlayers();
    if (users.length === 0) {
        throw new Error('No players found');
    }

    const sanitizedUsers = users.map(user => user.toPublicObject());
    return sanitizedUsers;
};


export async function passwordForgotten({ email }: { email: string }): Promise<string> {


    // lookup (throws if not found)


    const user = await userDb.getUserByEmail( email );

    if (!user) {
        throw Error('No user with that email found')
    }




    // token + expiry


    const token = randomBytes(32).toString('hex');


    const expires = addHours(new Date(), 1);





    // store in DB


    await userDb.storeResetToken(email, token, expires);





    // send the email


    const url = `${process.env.FRONTEND_URL}/password-reset?token=${token}`;


    await sendMail({


        to: user.getEmail(),


        subject: 'Password reset request',


        text: `Hi ${user.getName()},\nA password reset for your account has been requested. \nClick here: ${url}\nExpires in 1 hour.`,


    });





    return 'If that email is registered, you will receive a reset link shortly.';


}

export async function passwordReset({
    token,
    newPassword,
}: {
    token: string;
    newPassword: string;
}): Promise<string> {


    // find+validate token
    const rec = await userDb.findByResetToken(token);


    if (!rec || rec.resetTokenExpires.getTime() < Date.now()) {


        throw new Error('Invalid or expired reset token.');


    }





    // hash and update


    const hashed = await bcrypt.hash(newPassword, 12);


    await userDb.updatePassword(rec.email, hashed);





    // clear the token


    await userDb.clearResetToken(rec.email);
    return 'Password has been reset successfully.';


}
const addPlayer = async ({
    age,
    name,
    country,
    description,
    email,
    password,
}: UserInput): Promise<User> => {
    const player = new User({ age, name, country, description, email, password, role: 'Player' });

    const players = await userDb.getAllPlayers();
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

const getUserByEmail = async ({ email }: { email: string }): Promise<object> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email: ${email} does not exist`);
    }
    return user.toPublicObject();
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail( email );
    
    if (!user) {
        throw Error('No user with that email found.')
    }
    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('incorrect password.');
    }
    console.log(generateJwtToken({ email, role: user.getRole() as Role }))
    return {
        token: generateJwtToken({ email, role: user.getRole() as Role }),
        email,
        role: user.getRole() as Role,
    
    };
};

const getPlayerById = async (playerId: number): Promise<User> => {
    const user = await userDb.getPlayerById(playerId);
    if (user === undefined) {
        throw new Error(`Player with id ${playerId} not found`);
    }
    return user;
};

export default { getAllPlayers, addPlayer, getUserByEmail, authenticate, getPlayerById, passwordForgotten, passwordReset };
