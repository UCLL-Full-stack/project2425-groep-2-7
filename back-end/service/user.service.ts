import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';
import bcrypt from 'bcrypt';

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

const getPlayerById = async (playerId: number): Promise<User> => {
    const user = await userDb.getPlayerById(playerId);
    if (user === undefined) {
        throw new Error(`Player with id ${playerId} not found`);
    }
    return user;
}

/* const invitePlayerToTeam = ({
    message: String,
    team: TeamInput,
    user: UserInput,
}:InviteInput): Invite  => {

    const invite = new Invite({message, team, user});
}
*/
export default { getAllPlayers, addPlayer, getPlayerById };
