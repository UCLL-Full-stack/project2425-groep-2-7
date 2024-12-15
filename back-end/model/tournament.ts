import { Team } from './team';
import { Tournament as TournamentPrisma, Team as TeamPrisma} from '@prisma/client';
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

    static from(tournament: TournamentPrisma & { teams?: TeamPrisma[] }): Tournament {
            return new Tournament({
                name: tournament.name,
                location: tournament.location,
                game: tournament.game,
                teams: tournament.teams?.map(team =>  Team.from(team)) ?? [],
            });
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
