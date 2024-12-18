import { User } from "@/types";
import { Team } from "@/types";
import { get } from "http";

const getAllTeams = async (): Promise<Team[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiUrl}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Teams data:", data);
        return data;
    } catch (error) {
        console.log("Error fetching teams.", error);
        throw error;
    }
}

const getTeamById = async (teamId: number): Promise<Team> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiUrl}/teams/${teamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
        
        } catch (error) {
            console.log("Error fetching team.", error);
            throw error;
    }
}

const createTeam = async (teamData: {
    name: string;
    country: string;
    creatorId: number;
}) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(apiUrl + "/teams", {
        method: "POST",
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
    });
    console.log(response);
    return(response)
}

const TeamService = {
    getAllTeams,
    getTeamById,
    createTeam
}

export default TeamService;