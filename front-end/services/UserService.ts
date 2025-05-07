import { Invite, NewInvite, NewUser, User } from "@/types";

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

const getInvites = async (userId: number) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/players/invite/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json(); // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching invites:", error);
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<User> => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(email);
  try {
    const response = await fetch(`${apiUrl}/players/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const registerUser = (user: NewUser) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + "/players/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const createInvite = (invite: NewInvite) => {
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

const deleteInvite = async (inviteId: number): Promise<void> => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/players/invite/${inviteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete invite: ${errorMessage}`);
  }
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

export function passwordForgotten(email: string) {


  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/password-forgotten`, {


      method: 'POST',


      headers: { 'Content-Type': 'application/json' },


      body: JSON.stringify({ email }),


  });


}





export function passwordReset(token: string, newPassword: string) {


  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/password-reset`, {


      method: 'POST',


      headers: { 'Content-Type': 'application/json' },


      body: JSON.stringify({ token, newPassword }),


  });


}
const UserService = {
  getAllUsers,
  registerUser,
  getUserById,
  createInvite,
  loginUser,
  getUserByEmail,
  getInvites,
  deleteInvite,
  passwordForgotten,
  passwordReset
};

export default UserService;
