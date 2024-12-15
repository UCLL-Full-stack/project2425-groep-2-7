import { useState, useEffect } from 'react';
import TournamentTableOverview from "@/components/tournament/TournamentTableOverview";
import Filter from "@/components/tournament/TournamentFilters";
import TournamentService from '@/services/TournamentService';

const TournamentOverview: React.FC = () => {
    const [filter, setFilter] = useState(''); // Store the filter text
    const [tournaments, setTournaments] = useState<any[]>([]); // Assuming your tournaments data is an array
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
    const fetchTournaments = async () => {
        try {
            const tournamentsData = await TournamentService.getAllTournaments();
            setTournaments(tournamentsData);
        } catch (err) {
            setError('Could not load tournaments. Please try again later.');
            console.error(err);
        }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.location.toLowerCase().includes(filter.toLowerCase()) ||
    tournament.game.toLowerCase().includes(filter.toLowerCase())
  );

    return (
    <>
        <header className="bg-gray-800 p-4 text-center text-white">
                <h1 className="text-2xl font-bold">Tournaments</h1>
        </header>
        <main className="bg-gray-800 min-h-screen">
        <Filter onFilterChange={(filterValue) => setFilter(filterValue)} />
        <TournamentTableOverview tournaments={filteredTournaments} error={error} />
        </main>
    </>
    );
};

export default TournamentOverview