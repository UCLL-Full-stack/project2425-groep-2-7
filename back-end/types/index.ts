
type Role = 'Player' | 'Admin' | 'Coach' 

type PlayerInput = {
    age: number;
    name: string;
    country: string;
    description: string;
    email: string;
}

type TeamInput = {
    name: string;
    country: string;
    players?: PlayerInput[];
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
    players?: PlayerInput[];
}

export {
    Role,
    PlayerInput,
    TeamInput,
    TournamentInput,
    InviteInput,
}