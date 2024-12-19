import { Invite } from '../model/invite';
import { InviteInput } from '../types';
import { Team } from '../model/team';
import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const createInvite = async (inviteData: { teamId: number; userId: number }): Promise<Invite> => {
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
        console.error('Error creating Invite', error);
        throw error;
    }
};

const getInvites = async (userId: number): Promise<Invite[]> => {
    try {
      const inviteprisma = await database.invite.findMany({
        where: {
          userId: userId, // Filtering invites where userId equals the given userId
        },
        select: {
            id: true,
            teamId: true,
            userId: true,
        }
      });
      return inviteprisma.map((inviteprisma) => Invite.from(inviteprisma));
    } catch (error) {
      console.error("Error fetching invites:", error);
      throw new Error("Unable to fetch invites");
    }
  };

const deleteInvite = async (inviteId: number): Promise<void> => {
    try {
      await database.invite.delete({
        where: {
          id: inviteId,
        },
      });
    } catch (error) {
      console.error("Error deleting invite:", error);
      throw error;
    }
  };

  const getInviteById = async (inviteId: number): Promise<Invite> => {
    try {
      const inviteprisma = await database.invite.findFirst({
        where: {
          id: inviteId,
        },
      });
      if (!inviteprisma) {
        throw new Error(`Invite with id ${inviteId} not found`);
      }
      return Invite.from(inviteprisma);
    } catch (error) {
      console.error("Error fetching invite:", error);
      throw error;
    }
  }

export default { createInvite, getInvites, deleteInvite, getInviteById };
