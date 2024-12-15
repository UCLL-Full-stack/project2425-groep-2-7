import { Tournament } from "../model/tournament";
import TournamentDb from "../repository/tournament.db";

const getAllTournaments = async (): Promise<Tournament[]> => {
    const tournaments = await TournamentDb.getAllTournaments();
    if (!tournaments) {
        throw new Error("No tournaments found")
    }
    return tournaments;
}

export default { getAllTournaments };