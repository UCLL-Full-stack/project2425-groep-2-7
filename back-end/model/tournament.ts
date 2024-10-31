import { Team } from './team';

export class Tournament {
    readonly name: string;
    readonly location: string;
    readonly game: string;
    readonly teams: Team[];

    constructor(tournament: { name: string; location: string; game: string; teams?: Team[] }) {
        this.name = tournament.name;
        this.location = tournament.location;
        this.game = tournament.game;
        this.teams = tournament.teams ?? [];
    }

    equals({ name, location, game }: { name: string; location: string; game: string }): boolean {
        return this.name === name && this.location === location && this.game === game;
    }
}
