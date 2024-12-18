import React, { useEffect, useState } from 'react';
import { Team } from '@/types';
import { User } from '@/types';
import UserService from "@/services/UserService";
import TeamService from '@/services/TeamService';




const TeamTableOverview: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsData = await TeamService.getAllTeams();
                setTeams(teamsData);
            } catch (err) {
                setError('Could not load teams. Please try again later.');
                console.error('here thhe');
            }
        };

        fetchTeams();
    }, []);

    return (
        <>
            <header className="bg-gray-800 p-4 text-center text-white">
                <h1 className="text-2xl font-bold">Teams</h1>
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
                                    <th className="px-4 py-2 text-left">Country</th>
                                    <th className="px-4 py-2 text-left">Number of Players</th>
                                    <th className="px-4 py-2 text-left">Leader</th>

                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-blue-500 ${
                                            index % 2 === 0 ? 'bg-blue-600' : 'bg-blue-500'
                                        }`}
                                    >
                                        <td className="px-4 py-2">{team.name}</td>
                                        <td className="px-4 py-2">{team.country}</td>
                                        <td className="px-4 py-2">{team.players ? team.players.length : "Dead Team"}</td>
                                        <td className="px-4 py-2">{team.players ? team.players[0].user.name : "Dead Team"}</td>

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

export default TeamTableOverview;
