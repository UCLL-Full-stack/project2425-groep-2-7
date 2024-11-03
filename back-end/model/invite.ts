import { Team } from './team';
import { User } from './user';

export class Invite {
    private message: string;
    private team: Team;
    private user: User;

    constructor(invite: { 
        message: string; 
        team: Team; 
        user: User 
    }) { this.validate(invite)
        this.message = invite.message;
        this.team = invite.team;
        this.user = invite.user;
    }
    validate(invite: { message: string; team: Team; user: User}) {
        if (!invite.team ) {
            throw new Error('Team not found');
        }
        if (!invite.user) {
            throw new Error('User not found');
        }
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
