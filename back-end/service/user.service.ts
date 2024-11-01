import { User } from "../model/user";
import playerDb from "../repository/user.db";

const getAllPlayers = (): User[] => playerDb.getAllPlayers(); 


export default {getAllPlayers};