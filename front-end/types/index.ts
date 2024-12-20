export type Role = "Player" | "Admin" | "Coach";

export type NewUser = {
  age: number;
  name: string;
  country: string;
  description: string;
  email: string;
  password: string;
  teamId?: number;
  role?: Role;
};

export type User = NewUser & {
  id: number; // `id` is now required for fetched users
};

export type Team = {
  name: string;
  country: string;
  players: {
    user: User;
  }[];
};

export type Tournament = {
  name: string;
  location: string;
  game: string;
  teams?: {
    team: Team;
  }[];
};
export type Invite = {
  id : number;
  teamId: number;
  userId: number;
}
export type NewInvite = {
  teamId: number;
  userId: number;
};
