type Role = 'Player' | 'Admin' | 'Coach';

type UserInput = {
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
    message: string;
    team: TeamPlayersInput;
    user: UserInput;
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
