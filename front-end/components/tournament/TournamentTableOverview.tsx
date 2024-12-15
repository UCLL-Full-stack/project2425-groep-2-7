import React, { useEffect, useState } from 'react';
import TournamentService  from "@/services/TournamentService";
import { Tournament } from '@/types';


const  TournamentTableOverview: React.FC = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
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

    return (
        <>
            <header className="bg-gray-800 p-4 text-center text-white">
                <h1 className="text-2xl font-bold">Tournaments</h1>
            </header>
            <main className="bg-gray-800 p-6">
                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-blue-600 text-white rounded-3xl shadow-lg border border-black">
                            <thead className="bg-blue-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Game</th>
                                    <th className="px-4 py-2 text-left">Location</th>
                                    <th className="px-4 py-2 text-left">Number of teams</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournaments.map((tournament, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-blue-500 ${
                                            index % 2 === 0 ? 'bg-blue-600' : 'bg-blue-500'
                                        }`}
                                    >
                                        <td className="px-4 py-2">{tournament.name}</td>
                                        <td className="px-4 py-2">{tournament.game}</td>
                                        <td className="px-4 py-2">{tournament.location}</td>
                                        <td className="px-4 py-2">{tournament.teams? tournament.teams.length : 'No teams'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </>
    );
};

export default TournamentTableOverview;
