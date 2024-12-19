import TeamService from "@/services/TeamService";
import { useRouter } from "next/router";
import Head from "next/head";
import UserService from "@/services/UserService";
import React, { useEffect, useState, FormEvent } from 'react';
import { User, Team, Role } from "@/types";


const CreateTeam: React.FC = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [Id, setId] = useState<number | null>(null); // State for teamI
  const [nameError, setNameError] = useState<string | null>();
  const [countryError, setCountryError] = useState<string | null>();
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setCountryError(null);
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setLoggedUser(parsedUser);
    }
    setLoading(false);
}, []);

useEffect(() => {
    if (loggedUser && loggedUser.email) {
        const fetchUser = async () => {
            try {
                const user = await UserService.getUserByEmail(loggedUser.email);
                console.log(user);
                if (user && user.id) {
                    setId(user.id); // Save the teamId
                }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }
}, [loggedUser]);
  const validate = (): boolean => {
    let result = true;
    
    if (!name && name.trim() === "") {
      setNameError("name can not be empty");
      result = false;
    }

    if (!country && country.trim() === "") {
      setCountryError("country can not be empty");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (validate()) {
      if (!Id ) {
        throw new Error('User has nog valid id');
      }
      const team = {
        name,
        country,
        creatorId: Id
        ,
      };
      
      const response = await TeamService.createTeam(team);
      if (response.ok) {
        setStatus("Team successfully registered");
        router.push("/");
      } else {
        setStatus("Team registration failed" + response.statusText);
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
            Team Registration
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
              Country
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setCountry(e.target.value)}
            />
            {countryError && <p className="text-red-500">{countryError}</p>}
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

export default CreateTeam;
