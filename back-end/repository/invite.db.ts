import { Invite } from "../model/invite";
import { Team } from "../model/team";
import { User} from "../model/user";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const createInvite = async (inviteData: {
    teamId: number;
    userId: number;
}): Promise<Invite> => {
    try {
        const { teamId, userId } = inviteData;
        // Persist the invite to the database
        const createdInvite = await database.invite.create({
            data: {
                teamId,
                userId,
            },
        });
        return Invite.from(createdInvite);
    } catch (error) {
        console.error("Error creating Invite", error);
        throw error;
    }
};

export default { createInvite};

