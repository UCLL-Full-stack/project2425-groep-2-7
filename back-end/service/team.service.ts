import { Team } from "../model/team";
import { User } from "../model/user";
import teamDb from "../repository/team.db";
import userService from "./user.service";

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


const addTeam = async (teamData: {
  name: string;
  country: string;
  creatorId: number; // ID of the user creating the team
}): Promise<Team> => {
    console.log(teamData)
  try {
    const { name, country, creatorId } = teamData;

    // Create the team and associate the creator via their ID
    return teamDb.addTeam(teamData);
  } catch (error) {
    console.error("Error adding team to the database:", error);
    throw error;
  }
};

const addPlayerToTeam =async (
  playerId: number,
  teamId: number
) => { 

  console.log(playerId, teamId);

  const team = getTeamById(teamId);
  if (!team) {
    throw new Error(`Team with id ${teamId} not found`);
  }

  const user = userService.getPlayerById(playerId);
  if (!user) {
    throw new Error(`Player with id ${playerId} not found`);
  }

  try {
    return await teamDb.addPlayerToTeam(teamId, playerId);
  } catch (error) {
    console.error("Error adding player to team:", error);
    throw error;
  }
};

export default {getAllTeams, getTeamById, addTeam, addPlayerToTeam};
