import { Team }from "../model/team";
import teamDb from "../repository/team.db";

const getAllTeams = (): Team[] => {
    const teams = teamDb.getAllTeams();
    if (teams.length == 0) {
        throw new Error("No teams found");
    }
    return teams;
}

export default {getAllTeams};