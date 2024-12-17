import { Team } from '../model/team';
import teamDb from '../repository/team.db';

const getAllTeams = async (): Promise<Team[]> => {
    const teams = await teamDb.getAllTeams();
    if (teams.length == 0) {
        throw new Error('No teams found');
    }
    return teams;
};

const getTeamById = async (teamId: number): Promise<Team> => {
    const promiseTeam = await teamDb.getTeamById(teamId);
    if (promiseTeam === undefined) {
        throw new Error(`Team with id ${teamId} not found`);
    }
    return promiseTeam;
};

export default { getAllTeams, getTeamById };
