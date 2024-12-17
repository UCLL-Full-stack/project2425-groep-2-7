import { Team } from '../model/team';
import { User } from '../model/user';
import { Tournament } from '../model/tournament';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const player1 = new User({
    age: 21,
    name: 'Daan Schoenaers',
    country: 'Belgium',
    description: 'Student',
    email: 'daan.schoenaers@gmail.com',
    role: 'Player',
    password: 'password123',
});

const player2 = new User({
    age: 21,
    name: 'Florian Lebrun',
    country: 'Belgium',
    description: 'Student',
    email: 'florian.lebrun@gmail.com',
    role: 'Player',
    password: 'password123',
});

const player3 = new User({
    age: 21,
    name: 'Maxim Delloye',
    country: 'Italy',
    description: 'Student',
    email: 'maxim.delloye@gmail.com',
    role: 'Player',
    password: 'password123',
});

const player4 = new User({
    age: 20,
    name: 'Natan Delloye',
    country: 'Italy',
    description: 'Student',
    email: 'natan.delloye@gmail.com',
    role: 'Player',
    password: 'password123',
});

const Players = [player1, player2, player3, player4];

const wrapPlayers = (players: User[]): { user: User }[] =>
    players.map((player) => ({ user: player }));

const team1 = new Team({ name: 'ProPlayers', country: 'Belgium', players: wrapPlayers(Players) });
const team2 = new Team({
    name: 'Belgium ProPlayers',
    country: 'Belgium',
    players: wrapPlayers([player1, player2]),
});
const team3 = new Team({
    name: 'Italy ProPlayers',
    country: 'Italy',
    players: wrapPlayers([player3, player4]),
});

const teams = [team1, team2, team3];

const tournament1 = new Tournament({
    name: 'Pro League',
    location: 'Belgium, Antwerp',
    game: 'CS2',
    teams: teams,
});

const tournament2 = new Tournament({
    name: 'Amateur League',
    location: 'Belgium, Brussels',
    game: 'LOL',
    teams: [team2, team3],
});

const getAllTournaments = async (): Promise<Tournament[]> => {
    try {
        const tournamentprisma = await database.tournament.findMany({
            include: {
                teams: {
                    include: {
                        players: true,
                    },
                },
            },
        });
        return tournamentprisma.map((tournamentprisma) => Tournament.from(tournamentprisma));
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
};

export default { getAllTournaments };
