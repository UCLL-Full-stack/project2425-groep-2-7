import React, { useEffect, useState } from 'react';
import UserService from '@/services/UserService';
import { User } from '../../types';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    userId: number; // User ID to invite
}

const UserInvite: React.FC<ModalProps> = ({ isOpen, onClose, content, userId }) => {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [teamId, setTeamId] = useState<number | null>(null); // State for teamId

    // Fetch logged-in user from sessionStorage
    useEffect(() => {
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setLoggedUser(parsedUser);
        }
        setLoading(false);
    }, []);

    // Fetch user data by email and extract teamId
    useEffect(() => {
        if (loggedUser && loggedUser.email) {
            const fetchUser = async () => {
                try {
                    const user = await UserService.getUserByEmail(loggedUser.email);
                    console.log(user);
                    if (user && user.teamId) {
                        setTeamId(user.teamId); // Save the teamId
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
    }, [loggedUser]);

    // Create inviteData and handle invitation
    const handleInvite = async () => {
        if (teamId && userId) {
            const inviteData = { teamId, userId };
            try {
                // Call your invite API here
                await UserService.createInvite(inviteData);
                alert('User invited successfully!');
                onClose(); // Close modal after successful invite
            } catch (error) {
                console.error('Failed to send invite:', error);
                alert('Failed to invite the user. Please try again.');
            }
        } else {
            alert('User is not part of a team or teamId is missing.');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!isOpen) return null; // Do not render the modal if it's closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Player Invite</h2>
                <p>{content}</p>
                <div className="flex justify-center">
                    <button
                        className="mt-4 mr-8 bg-red-500 text-white py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleInvite}
                    >
                        Invite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInvite;
