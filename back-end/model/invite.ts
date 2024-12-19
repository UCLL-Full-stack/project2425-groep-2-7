import { Invite as InvitePrisma } from '@prisma/client';

export class Invite {
    private id: number | null; // Ensure it only allows number or null
    private teamId: number;
    private userId: number;

    constructor(invite: { id?: number | null; teamId: number; userId: number }) {
        this.validate(invite);
        this.id = invite.id ?? null; // Handle undefined by defaulting to null
        this.teamId = invite.teamId;
        this.userId = invite.userId;
    }

    validate(invite: { teamId: number; userId: number }) {
        if (!invite.teamId) {
            throw new Error('Invalid TeamId');
        }
        if (!invite.userId) {
            throw new Error('Invalid UserId');
        }
    }

    equals({ teamId, userId }: { teamId: number; userId: number }): boolean {
        return this.teamId === teamId && this.userId === userId;
    }

    static from({ id, teamId, userId }: InvitePrisma): Invite {
        return new Invite({ id: id ?? null, teamId, userId }); // Handle undefined here as well
    }

    getId(): number | null {
        return this.id;
    }

    getTeamId(): number {
        return this.teamId;
    }

    getUserId(): number {
        return this.userId;
    }
}
