import UserService from '@/services/UserService';
import React, { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

const UserInvite: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Player Invite</h2>
                <p>{content}</p>
                <div className= "flex justify-center">
                <button
                    className="mt-4 mr-8 bg-red-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Invite
                </button>
                </div>
            </div>
        </div>
    );
};

export default UserInvite;
