import { Tournament } from "../model/tournament";
import TournamentDb from "../repository/tournament.db";

const getAllTournaments = (): Tournament[] => TournamentDb.getAllTournaments();

export default { getAllTournaments };