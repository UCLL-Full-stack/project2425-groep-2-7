import { Team }from "../model/team";
import teamDb from "../repository/team.db";

const getAllTeams = (): Team[] => teamDb.getAllTeams();

export default {getAllTeams};