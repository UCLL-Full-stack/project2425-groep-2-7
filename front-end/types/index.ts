type Role = "Player" | "Admin" | "Coach";

export type User = {
  id: number;
  age: number;
  name: string;
  country: string;
  description: string;
  email: string;
  role: Role;
};
