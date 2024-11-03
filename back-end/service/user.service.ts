import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput,  } from "../types";

const getAllPlayers = (): User[] =>{
    const users = userDb.getAllPlayers(); 
    if (users.length == 0){
        throw new Error('No players found');
    }
    return users;
}
const addPlayer =  ({
    age,
    name,
    country,
    description,
    email,
    password,
    favGames,
}:UserInput):User => {
    
    const player = new User({age, name, country, description, email, password, favGames, role: 'Player'});

    const players = getAllPlayers();
    for (const player of players) {
        if (player.equals({age, name, country, description, email, password, favGames, role: 'Player'})) {
            throw new Error('Player already exists');
        }
    }
    return userDb.addPlayer(player);
}













/* const invitePlayerToTeam = ({
    message: String,
    team: TeamInput,
    user: UserInput,
}:InviteInput): Invite  => {

    const invite = new Invite({message, team, user});
}
*/
export default {getAllPlayers, addPlayer};