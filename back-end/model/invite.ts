import { Team } from './team';
import { Player } from './player';

export class Invite {
    readonly message: string;
    readonly team: Team;
    readonly players: Player[];

    constructor(invite: { message: string; team: Team; players?: Player[] }) {
        this.message = invite.message;
        this.team = invite.team;
        this.players = invite.players ?? [];
    }
}
