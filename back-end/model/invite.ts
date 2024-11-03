import { Team } from './team';
import { User } from './user';

export class Invite {
    private message: string;
    private team: Team;
    private user: User;

    constructor(invite: { message: string; team: Team; user: User }) {
        this.message = invite.message;
        this.team = invite.team;
        this.user = invite.user;
    }
    equals({
        message,
        team,
        user
    }: {
        message: String,
        team: Team,
        user: User
    }): boolean {
        return (
            this.message == message && 
            this.team == team &&
            this.user == user
        );
    }
}
