import { Team } from './team';

export class Tournament {
    private name: string;
    private location: string;
    private game: string;
    private teams: Team[];

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
