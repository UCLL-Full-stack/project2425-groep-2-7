import { Invite as InvitePrisma} from '@prisma/client'
export class Invite {
    private teamId: number;
    private userId: number;

    constructor(invite: {teamId: number; userId: number }) {
        this.validate(invite);
        this.teamId = invite.teamId;
        this.userId = invite.userId;
    }
    validate(invite: { teamId: number; userId: number }) {
        if (!invite.teamId) {
            throw new Error('InvalidTeamId');
        }
        if (!invite.userId) {
            throw new Error('Invalid UserId');
        }
    }
    equals({  teamId, userId }: {  teamId: number; userId: number }): boolean {
        return  this.teamId == teamId && this.userId == userId;
    }

    static from({
        teamId,
        userId
    }: InvitePrisma): Invite {
        return new Invite({ teamId, userId });
    }
};
