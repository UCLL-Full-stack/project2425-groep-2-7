import { User } from './user';
import { Team as TeamPrisma, User as UserPrisma } from '@prisma/client';

export class Team {
    private id?: number; // Add ID property if needed (e.g., UUID)
    private name: string;
    private country: string;
    private players: { user: User }[];

    constructor(team: { id?: number, name: string; country: string; players: { user: User }[] }) {
        this.validate(team);
        this.id = team.id;  // Add ID property if needed (e.g., UUID)
        this.name = team.name;
        this.country = team.country;
        this.players = team.players;
    }

    static from(team: TeamPrisma & { players?: UserPrisma[] }): Team {
        return new Team({
            id : team.id,
            name: team.name,
            country: team.country,
            players: team.players?.map((player) => ({ user: User.from(player) })) ?? [],
        });
    }

    validate(team: { name: string; country: string; players: { user: User }[] }) {
        if (!team.name) {
            throw new Error('Name is required');
        }
        if (!team.country) {
            throw new Error('Country is required');
        }
    }

    equals({ name, country }: { name: string; country: string }): boolean {
        return this.name === name && this.country === country;
    }

    getName() {
        return this.name;
    }

    getCountry() {
        return this.country;
    }
    getPlayers() {
        return this.players
    }
    getId() {
        return this.id;
    }
}
