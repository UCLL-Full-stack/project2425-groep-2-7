import { Invite } from "../model/invite"
import inviteDb from "../repository/invite.db"
import teamService from "../service/team.service"
import userService from "../service/user.service"
import * as Sentry from "@sentry/node"; 

const addInvite = async (inviteData: {
    teamId: number,
    userId: number
}): Promise<Invite> => {
    console.log(inviteData)
    const teamId = inviteData.teamId
    const userId = inviteData.userId
    console.log(teamId)
    if (!teamId ) {
        throw new Error("No team found")
    }
    if (!userId || await userService.getPlayerById(userId) == null) {
        throw new Error("No user found")
    }
    try {
        return inviteDb.createInvite(inviteData)
    } catch (error) {
        Sentry.captureException(error)
        console.error("Error while creating invite");
        throw error
    }
}

const getInvites = async (userId: number): Promise<Invite[]> => {
    const filteredInvites = await inviteDb.getInvites(userId);
    if (filteredInvites.length === 0) {
        throw new Error(`No invites found for user with id ${userId}`);
    }
    console.log(filteredInvites)
    return filteredInvites;
}

const deleteInvite = async (inviteId: number): Promise<void> => {
    if (!inviteId) {
        throw new Error("No invite ID provided");
    }

    // Check if the invite exists (assuming you have a database or some form of storage)
    const invite = await inviteDb.getInviteById(inviteId); // Replace this with your actual data access logic

    if (!invite) {
        throw new Error("Invite not found");
    }

    await inviteDb.deleteInvite(inviteId); 
};


export default { addInvite, getInvites, deleteInvite}