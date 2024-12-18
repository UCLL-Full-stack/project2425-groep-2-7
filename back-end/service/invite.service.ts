import { Invite } from "../model/invite"
import inviteDb from "../repository/invite.db"
import teamService from "../service/team.service"
import userService from "../service/user.service"

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
        console.error("Error while creating invite");
        throw error
    }
}

export default { addInvite}