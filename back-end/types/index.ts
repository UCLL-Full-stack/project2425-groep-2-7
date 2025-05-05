import { JwtPayload } from 'jsonwebtoken';

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
    id: number;
    teamId: number;
    userId: number;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role?: Role;
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

declare module 'express' {
    interface Request {
        auth?: JwtPayload & {
            email?: string;
            role?: string;
        };
    }
}
