import React, { useEffect, useState } from "react";
import { Invite } from "@/types";
import { User } from "@/types";
import UserService from "@/services/UserService";
import TeamService from "@/services/TeamService";

const InviteTableOverview: React.FC = () => {
  const [invites, setInvites] = useState<Invite[] | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState<string | null>(null);

  // Retrieve logged-in user from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedUser(parsedUser);
    }
  }, []);

  // Fetch teamId based on logged-in user email
  useEffect(() => {
    if (loggedUser && loggedUser.email) {
      const fetchUser = async () => {
        try {
          const user = await UserService.getUserByEmail(loggedUser.email);
          console.log(user);
          if (user && user.id) {
            setUserId(user.id); // Save the userId
          }
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

  // Fetch invites when userId is available
  useEffect(() => {
    if (userId) {
      const fetchInvites = async () => {
        try {
          const invites = await UserService.getInvites(userId);
          setInvites(invites);
          console.log(invites);
        } catch (error) {
          console.error('Error fetching team invites:', error);
        }
      };
      fetchInvites();
    }
  }, [userId]);

  // Fetch team name based on teamId
  useEffect(() => {
    if (teamId) {
      const fetchTeamName = async () => {
        try {
          const team = await TeamService.getTeamById(teamId); // Assuming the function returns a team object
          setTeamName(team.name); // Store the team name
        } catch (error) {
          console.error('Error fetching team data:', error);
        }
      };
      fetchTeamName();
    }
  }, [teamId]);

  const acceptInvite = async (invite: Invite) => {
    try {
      await TeamService.addPlayerToTeam(invite.teamId, invite.userId); // Add player to team
      await UserService.deleteInvite(invite.id); // Delete the invite
      setInvites((prev) => prev?.filter((i) => i.id !== invite.id) || null); // Update state
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  // Reject an invite: Simply delete the invite
  const rejectInvite = async (invite: Invite) => {
    try {
      await UserService.deleteInvite(invite.id); // Delete the invite
      setInvites((prev) => prev?.filter((i) => i.id !== invite.id) || null); // Update state
    } catch (error) {
      console.error("Error rejecting invite:", error);
    }
  };

  return (
    <>
      <header className="bg-gray-800 p-4 text-center text-white">
        <h1 className="text-2xl font-bold">Invites</h1>
      </header>
      <main className="bg-gray-800 p-6">
        <table className="w-full bg-red-600 text-white shadow-lg border border-black">
          <thead className="bg-red-700">
            <tr>
              <th className="px-4 py-2 text-left">Invite</th>
              <th className="px-4 py-2 text-left">Accept</th>
              <th className="px-4 py-2 text-left">Reject</th>
            </tr>
          </thead>
          <tbody>
            {invites && invites.length > 0 && teamName ? (
              invites.map((invite) => (
                <tr key={invite.id}>
                  <td className="px-4 py-2">You have an invite to {teamName}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => acceptInvite(invite)}>Accept</button>
                  </td>
                  <td className="px-4 py-2">
                    <button onClick={() => rejectInvite(invite)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  No invites available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default InviteTableOverview;
