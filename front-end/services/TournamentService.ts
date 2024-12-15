import { Tournament } from '@/types';

const getAllTournaments = async (): Promise<Tournament[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiUrl}/tournaments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data
        } catch (error) {
            console.log("Error fetching TeamService.", error);
            throw error;
    }
};

const TournamentService = {
    getAllTournaments,
}

export default TournamentService;