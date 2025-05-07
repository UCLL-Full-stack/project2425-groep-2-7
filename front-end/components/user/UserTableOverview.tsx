import React, { useEffect, useState } from "react";
import { User } from "@/types";
import UserService from "@/services/UserService";
import TeamService from "@/services/TeamService";
import UserInvite from "./UserInviteButton";
import { useTranslation, UseTranslation } from "next-i18next";

const TeamName: React.FC<{ teamId: number | null }> = ({ teamId }) => {
  const [teamName, setTeamName] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamName = async () => {
      if (teamId) {
        try {
          const team = await TeamService.getTeamById(teamId);
          setTeamName(team.name);
        } catch (err) {
          console.error("Failed to fetch team for ID", teamId, err);
          setTeamName("Error fetching team");
        }
      } else {
        setTeamName("No Team");
      }
    };

    fetchTeamName();
  }, [teamId]);

  return <>{teamName || "Loading..."}</>;
};

const UserTableOverview: React.FC = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loggedTeamId, setLoggedTeamId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const users = await UserService.getAllUsers();
        setPlayers(users);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("Could not load players. Please try again later.");
        }
        console.error(err);
      }
    };

    fetchPlayers();
  }, []);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedUser(parsedUser);
    }
  }, []);

  // Fetch user data by email and extract teamId
  useEffect(() => {
    if (loggedUser && loggedUser.email) {
      const fetchUser = async () => {
        try {
          const user = await UserService.getUserByEmail(loggedUser.email);
          console.log(user);
          if (user && user.teamId) {
            setLoggedTeamId(user.teamId); // Save the teamId
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [loggedUser]);
  const handleOpenModal = (content: string, userId: number) => {
    setModalContent(content);
    setSelectedUserId(userId);
    setIsModalOpen(true);
    console.log(selectedUserId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setSelectedUserId(null);
  };
  const { t } = useTranslation();
  return (
    <>
      <header className="bg-gray-800 p-4 text-center text-white">
        <h1 className="text-2xl font-bold">{t("players.header")}</h1>
      </header>
      <main className="bg-gray-800 p-6">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-red-600 text-white rounded-3xl shadow-lg border border-black">
              <thead className="bg-red-700">
                <tr>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.age")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.player")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.country")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.team")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.description")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.actions")}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t("players.columns.role")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-red-500 ${
                      index % 2 === 0 ? "bg-red-600" : "bg-red-500"
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
                      {loggedTeamId ? (
                        <button
                          onClick={() =>
                            handleOpenModal(
                              `Are you sure you want to invite ${player.name} to your team? `,
                              player.id
                            )
                          }
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                          {t("players.invite.button")}
                        </button>
                      ) : (
                        <div className="text-gray-400 italic">
                          {t("players.invite.noTeam")}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">{player.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <UserInvite
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={modalContent}
        userId={selectedUserId!}
      />
    </>
  );
};

export default UserTableOverview;
