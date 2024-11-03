import { User } from "@/types";

const getAll = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + "/players", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

const UserService = {
  getAll,
  registerUser,
};

export default UserService;
