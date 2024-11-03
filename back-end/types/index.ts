
type Role = 'Player' | 'Admin' | 'Coach' 

type UserInput = {
    age: number;
    name: string;
    country: string;
    description: string;
    email: string;
    password: string;
    favGames: string;
    role?: Role;
}

type TeamInput = {
    name: string;
    country: string;
    players?: UserInput[];
}

type TournamentInput = {
    name: string;
    location: string;
    game: string;
    teams?: TeamInput[];
}

type InviteInput = {
    message: string;
    team: TeamInput;
    user: UserInput;
}

export {
    Role,
    UserInput,
    TeamInput,
    TournamentInput,
    InviteInput,
}