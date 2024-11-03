import { Tournament } from "../model/tournament";
import TournamentDb from "../repository/tournament.db";

const getAllTournaments = (): Tournament[] => {
    const tournaments = TournamentDb.getAllTournaments();
    if (tournaments.length > 0) {
        throw new Error("No tournaments found")
    }
    return tournaments;
}

export default { getAllTournaments };