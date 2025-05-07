import { Tournament } from '../model/tournament';
import { TournamentInput } from '../types';
import tournamentDb from '../repository/tournament.db';
import TournamentDb from '../repository/tournament.db';
import * as Sentry from "@sentry/node"; 

const getAllTournaments = async (): Promise<Tournament[]> => {
    const tournaments = await TournamentDb.getAllTournaments();
    if (!tournaments) {
        throw new Error('No tournaments found');
    }
    return tournaments;
};

const addTournament = async (tournament: TournamentInput): Promise<Tournament> => {
    console.log(tournament);
    try {
        return tournamentDb.addTournament(tournament);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error adding tournament to the database:', error);
        throw error;
    }
};

export default { getAllTournaments, addTournament };
