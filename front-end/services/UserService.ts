import { User } from "@/types";

const getAllUsers = async (): Promise<User[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
      const response = await fetch(`${apiUrl}/players`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      const data: User[] = await response.json(); // Parse and type the JSON data
      return data;
  } catch (error) {
    
      console.error("Error fetching players:", error);
      throw error;
  }
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

const UserService = {
  getAllUsers,
  registerUser,
};

export default UserService;
