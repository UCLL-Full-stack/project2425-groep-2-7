import { Team } from "../model/team";
import { User} from "../model/user";
import { Tournament } from "../model/tournament";


const player1 = new User({
    age: 21,
    name: "Daan Schoenaers",
    country: "Belgium",
    description: "Student",
    email: "daan.schoenaers@gmail.com",
    role: "Player",
    password: "password123",
    favGames: "CS2, RL",
});

const player2 = new User({
    age: 21,
    name: "Florian Lebrun",
    country: "Belgium",
    description: "Student",
    email: "florian.lebrun@gmail.com",
    role: "Player",
    password: "password123",
    favGames: "CS2, RL",
});

const player3 = new User({
    age: 21,
    name: "Maxim Delloye",
    country:"Italy",
    description: "Student",
    email: "maxim.delloye@gmail.com",
    role: "Player",
    password: "password123",
    favGames: "CS2, RL",
});

const player4 = new User({
    age: 20,
    name: "Natan Delloye",
    country: "Italy",
    description: "Student",
    email: "natan.delloye@gmail.com",
    role: "Player",
    password: "password123",
    favGames: "CS2, RL",
});

const Players = [player1, player2, player3, player4]

const team1 = new Team({ name: 'ProPlayers', country: 'Belgium', players: Players })
const team2 = new Team({ name: 'Belgium ProPlayers', country: 'Belgium', players: [player1, player2] })
const team3 = new Team({ name: 'Italy ProPlayers', country: 'Italy', players: [player3, player4] })

const teams = [team1, team2, team3]

const tournament1 = new Tournament({
    name: "Pro League",
    location: "Belgium, Antwerp",
    game: "CS2",
    teams: teams
});

const tournament2 = new Tournament({
    name: "Amateur League",
    location: "Belgium, Brussels",
    game: "LOL",
    teams: [team2, team3]
});

const tournaments = [tournament1, tournament2];

const getAllTournaments = (): Tournament[] => tournaments;

export default {getAllTournaments};
