type Role = 'Player' | 'Admin' | 'Coach';

type UserInput = {
    id: number;
    age: number;
    name: string;
    country: string;
    description: string;
    email: string;
    password: string;
    role?: Role | undefined;
};

type TeamIdInput = {
    name: string;
    country: string;
    creatorId: number;
};
type TeamPlayersInput = {
    name: string;
    country: string;
    players: UserInput[];
};

type TournamentInput = {
    name: string;
    location: string;
    game: string;
    teams?: TeamPlayersInput[];
};

type InviteInput = {
    teamId: number;
    userId: number;
};

type AuthenticationResponse = {
    token: string;
    email: string;
};

export {
    Role,
    UserInput,
    TeamIdInput,
    TeamPlayersInput,
    TournamentInput,
    InviteInput,
    AuthenticationResponse,
};
