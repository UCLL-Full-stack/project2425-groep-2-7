import { Tournament } from "@/types";

const getAllTournaments = async (): Promise<Tournament[]> => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/tournaments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching TeamService.", error);
    throw error;
  }
};

const createTournament = async (tournamentdata: {
  name: string;
  location: string;
  game: string;
  teams: any[];
}) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(apiUrl + "/tournaments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tournamentdata),
  });
  console.log(response);
  return response;
};

const TournamentService = {
  getAllTournaments,
  createTournament,
};

export default TournamentService;
