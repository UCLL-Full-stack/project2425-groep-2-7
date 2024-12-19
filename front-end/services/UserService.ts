import { User } from "@/types";
import { Invite } from "@/types";
const getAllUsers = async (): Promise<User[]> => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/players`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: User[] = await response.json(); // Parse and type the JSON data
    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

const getUserById = async (userId: number): Promise<User> => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(userId);
  try {
    const response = await fetch(`/${apiUrl}/players/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const getUserByEmail = async (userEmail: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = sessionStorage.getItem("authToken");
  return fetch(`${apiUrl}/users/${userEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const registerUser = (user: User) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + "/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const createInvite = (invite: Invite) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + "/players/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invite),
  });
};

const loginUser = (loginData: { email: string; password: string }) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/players/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
};

const UserService = {
  getAllUsers,
  registerUser,
  getUserById,
  createInvite,
  loginUser,
  getUserByEmail,
};

export default UserService;
