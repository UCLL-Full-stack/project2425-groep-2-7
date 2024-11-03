import { User } from './user';

export class Team {
    private name: string;
    private country: string;
    private players: User[];

    constructor(team: { 
        name: string;
        country: string;
        players: User[] 
    }) { this.validate(team); 
        this.name = team.name;
        this.country = team.country;
        this.players = team.players;
    }

    validate(team:{ name: string; country: string; players: User[]}) {
        if (!team.name) {
            throw new Error('Name is required');
        }
        if (!team.country) {
            throw new Error('Country is required');
        }
        if (team.players.length == 0) {
            throw new Error('At least one player is required');
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
}
