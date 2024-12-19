

export type Role = "Player" | "Admin" | "Coach";

export type User = {
  id: number;
  age: number;
  name: string;
  country: string;
  description: string;
  email: string;
  password: string;
  teamId?: number;
  role?: Role;
};

export type Team = {
  name: string;
  country: string;
  players: {
    user: User
  }[];
};

export type Tournament = {
  name: string;
  location: string;
  game: string;
  teams?: {
    team : Team;
  }[];
};

export type Invite = {
  id: number;
  teamId: number;
  userId: number;
}
