import TournamentService from "@/services/TournamentService";
import { useRouter } from "next/router";
import React, { useEffect, useState, FormEvent } from 'react';
import { Tournament } from "@/types";


const CreateTournament: React.FC = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [game, setGame] = useState("");
  const [status, setStatus] = useState<string>("");
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState<string | null>(null);
    
  const [nameError, setNameError] = useState<string | null>();
  const [locationError, setLocationError] = useState<string | null>();
  const [gameError, setGameError] = useState<string | null>();

  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setLocationError(null);
    setGameError(null);
  };
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const tournamentsData = await TournamentService.getAllTournaments();
            setTournaments(tournamentsData);
        } catch (err) {
            setError('Could not load tournaments. Please try again later.');
            console.error(err);
        }
    };

    fetchUsers();
}, []);
  const validate = (): boolean => {
    let result = true;
    
    if (!name && name.trim() === "") {
      setNameError("name can not be empty");
      result = false;
    }

    if (!location && location.trim() === "") {
      setLocationError("country can not be empty");
      result = false;
    }

    if (!game && game.trim() === "") {
        setGameError("country can not be empty");
        result = false;
      }

    return result;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (validate()) {
      const tournament = {
        name,
        location,
        game,
        teams: []
      };
      console.log(tournament);
      const response = await TournamentService.createTournament(tournament);
      if (response.ok) {
        setStatus("Tournament successfully registered");
        router.push("/");
      } else {
        setStatus("Tournament registration failed" + response.statusText);
      }
    }
  };

  return (
    <>
      <main className="flex items-center justify-center pt-12 min-h-screen bg-gray-800">
        <form
          className="bg-red-600 text-white rounded-lg shadow-lg p-8 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Tournament Registration
          </h1>

          {status && (
            <div
              className={`mb-4 ${
                status.includes('error') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {status}
            </div>
          )}


          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block mb-1">
              Location
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setLocation(e.target.value)}
            />
            {locationError && <p className="text-red-500">{location}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block mb-1">
              Game
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setGame(e.target.value)}
            />
            { gameError && <p className="text-red-500">{game}</p>}
          </div>


          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-red-800 text-white py-2 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateTournament;
