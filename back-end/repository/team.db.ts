import { Team } from "../model/team";
import { User} from "../model/user";

const player1 = new User({
    age: 21,
    name: "Daan Schoenaers",
    country: "Belgium",
    description: "Student",
    email: "daan.schoenaers@gmail.com",
    role: "Player"
})

const player2 = new User({
    age: 21,
    name: "Florian Lebrun",
    country: "Belgium",
    description: "Student",
    email: "florian.lebrun@gmail.com",
    role: "Player"
})

const player3 = new User({
    age: 21,
    name: "Maxim Delloye",
    country:"Italy",
    description: "Student",
    email: "maxim.delloye@gmail.com",
    role: "Player"
})

const player4 = new User({
    age: 20,
    name: "Natan Delloye",
    country: "Italy",
    description: "Student",
    email: "natan.delloye@gmail.com",
    role: "Player"
});


const Players = [player1, player2, player3, player4]

const team1 = new Team({ name: 'ProPlayers', country: 'Belgium', players: Players })
const team2 = new Team({ name: 'Belgium ProPlayers players', country: 'Belgium', players: [player1, player2] })
const team3 = new Team({ name: 'Italy ProPlayers', country: 'Italy', players: [player3, player4] })

const teams = [team1, team2, team3]

const getAllTeams = (): Team[] => teams;

export default {getAllTeams};

