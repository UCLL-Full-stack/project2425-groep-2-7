import { Team } from './team';
import { User } from './user';

export class Invite {
    readonly message: string;
    readonly team: Team;
    readonly users: User[];

    constructor(invite: { message: string; team: Team; users?: User[] }) {
        this.message = invite.message;
        this.team = invite.team;
        this.users = invite.users ?? [];
    }
}
