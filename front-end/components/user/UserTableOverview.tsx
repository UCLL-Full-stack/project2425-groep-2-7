import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import UserService from "@/services/UserService";
import TeamService from '@/services/TeamService';
import UserInvite from './UserInviteButton';

const TeamName: React.FC<{ teamId: number | null }> = ({ teamId }) => {
    const [teamName, setTeamName] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamName = async () => {
            if (teamId) {
                try {
                    const team = await TeamService.getTeamById(teamId);
                    setTeamName(team.name);
                } catch (err) {
                    console.error(`Failed to fetch team for ID ${teamId}`, err);
                    setTeamName('Error fetching team');
                }
            } else {
                setTeamName('No Team');
            }
        };

        fetchTeamName();
    }, [teamId]);

    return <>{teamName || 'Loading...'}</>;
};

const UserTableOverview: React.FC = () => {
    const [players, setPlayers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const users = await UserService.getAllUsers();
                setPlayers(users);
            } catch (err) {
                setError('Could not load players. Please try again later.');
                console.error(err);
            }
        };

        fetchPlayers();
    }, []);

    const handleOpenModal = (content: string) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <>
            <header className="bg-gray-800 p-4 text-center text-white">
                <h1 className="text-2xl font-bold">Players</h1>
            </header>
            <main className="bg-gray-800 p-6">
                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-red-600 text-white rounded-3xl shadow-lg border border-black">
                            <thead className="bg-red-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Player</th>
                                    <th className="px-4 py-2 text-left">Age</th>
                                    <th className="px-4 py-2 text-left">Country</th>
                                    <th className="px-4 py-2 text-left">Team</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-red-500 ${
                                            index % 2 === 0 ? 'bg-red-600' : 'bg-red-500'
                                        }`}
                                    >
                                        <td className="px-4 py-2">{player.name}</td>
                                        <td className="px-4 py-2">{player.age}</td>

                                        <td className="px-4 py-2">{player.country}</td>
                                        <td className="px-4 py-2">
                                            <TeamName teamId={player.teamId || null} />
                                        </td>
                                        <td className="px-4 py-2">{player.description}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleOpenModal(`Are you sure you want to invite ${player.name} to your team? `)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                            >
                                                Invite to Team
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            
            <UserInvite isOpen={isModalOpen} onClose={handleCloseModal} content={modalContent} />

        </>
    );
};

export default UserTableOverview;
