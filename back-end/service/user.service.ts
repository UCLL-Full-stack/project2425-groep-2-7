import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput  } from "../types";

const getAllPlayers = async (): Promise<User[]> =>{
    const users = await userDb.getAllPlayers(); 
    if (users.length == 0){
        throw new Error('No players found');
    }
    return users;
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

    const players = await getAllPlayers();
    for (const existingPlayer of players) {
        if (existingPlayer.equals(player.toPlainObject())) {
            throw new Error('Player already exists');
        }
    }

    // Convert the User instance to a plain object before saving
    return userDb.addPlayer(player.toPlainObject());
};














/* const invitePlayerToTeam = ({
    message: String,
    team: TeamInput,
    user: UserInput,
}:InviteInput): Invite  => {

    const invite = new Invite({message, team, user});
}
*/
export default {getAllPlayers, addPlayer};