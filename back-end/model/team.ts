import { Player } from './player';

export class Team {
    readonly name: string;
    readonly country: string;
    readonly players: Player[];

    constructor(team: { name: string; country: string; players?: Player[] }) {
        this.name = team.name;
        this.country = team.country;
        this.players = team.players ?? [];
    }

    equals({ name, country }: { name: string; country: string }): boolean {
        return this.name === name && this.country === country;
    }
}
