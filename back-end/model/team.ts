import { User } from './user';

export class Team {
    private name: string;
    private country: string;
    private players: User[];

    constructor(team: { name: string; country: string; players?: User[] }) {
        this.name = team.name;
        this.country = team.country;
        this.players = team.players ?? [];
    }

    equals({ name, country }: { name: string; country: string }): boolean {
        return this.name === name && this.country === country;
    }
}
