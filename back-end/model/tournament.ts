import { Team } from './team';

export class Tournament {
    private name: string;
    private location: string;
    private game: string;
    private teams: Team[];

    constructor(tournament: { 
        name: string; 
        location: string; 
        game: string; 
        teams?: Team[] 
    }) { this.validate(tournament)
        this.name = tournament.name;
        this.location = tournament.location;
        this.game = tournament.game;
        this.teams = tournament.teams ?? [];
    }

    validate(tournament: { name: string; location: string; game: string; teams?: Team[] }) {
        if (!tournament.name || typeof tournament.name!=='string') {
            throw new Error('Invalid tournament name');
        }
        if (!tournament.location || typeof tournament.location!=='string')  {
            throw new Error('Invalid tournament location');
        }
        if (!tournament.game || typeof tournament.game!=='string')  {
            throw new Error('Invalid tournament game');
        }
    }

    equals({ name, location, game }: { name: string; location: string; game: string }): boolean {
        return this.name === name && this.location === location && this.game === game;
    }

    getName() {
        return this.name;
    }

    getLocation() {
        return this.location;
    }
    getGame() {
        return this.game;
    }
}
