import inviteService from '../../service/invite.service';
import { Invite } from '../../model/invite';
import inviteDb from '../../repository/invite.db';
import userService from '../../service/user.service';

// Mocking the required services and database methods
jest.mock('../../repository/invite.db');
jest.mock('../../service/user.service');

const mockCreateInvite = jest.fn();
const mockGetInvites = jest.fn();
const mockGetInviteById = jest.fn();
const mockDeleteInvite = jest.fn();
const mockGetPlayerById = jest.fn();

beforeEach(() => {
    // Reset all mocks before each test
    mockCreateInvite.mockReset();
    mockGetInvites.mockReset();
    mockGetInviteById.mockReset();
    mockDeleteInvite.mockReset();
    mockGetPlayerById.mockReset();

    inviteDb.createInvite = mockCreateInvite;
    inviteDb.getInvites = mockGetInvites;
    inviteDb.getInviteById = mockGetInviteById;
    inviteDb.deleteInvite = mockDeleteInvite;
    userService.getPlayerById = mockGetPlayerById;
});

test('should add an invite successfully', async () => {
    // Given
    const inviteData = { teamId: 1, userId: 1 };
    const invite = new Invite({ teamId: 1, userId: 1 });

    mockGetPlayerById.mockResolvedValue({ id: 1, username: 'johndoe' }); // Mock that the user exists
    mockCreateInvite.mockResolvedValue(invite);

    // When
    const result = await inviteService.addInvite(inviteData);

    // Then
    expect(mockCreateInvite).toHaveBeenCalledTimes(1);
    expect(mockCreateInvite).toHaveBeenCalledWith(inviteData);
    expect(result).toEqual(invite);
});

test('should throw an error if no userId is found when adding invite', async () => {
    // Given
    const inviteData = { teamId: 1, userId: 1 };
    mockGetPlayerById.mockResolvedValue(null); // Mock that the user is not found

    // When
    const addInvite = async () => await inviteService.addInvite(inviteData);

    // Then
    await expect(addInvite).rejects.toThrow('No user found');
});

test('should get all invites for a user', async () => {
    // Given
    const userId = 1;
    const invites = [
        new Invite({ teamId: 1, userId: 1 }),
        new Invite({ teamId: 2, userId: 1 }),
    ];

    mockGetInvites.mockResolvedValue(invites);

    // When
    const result = await inviteService.getInvites(userId);

    // Then
    expect(mockGetInvites).toHaveBeenCalledTimes(1);
    expect(result).toEqual(invites);
});

test('should throw an error if no invites are found for a user', async () => {
    // Given
    const userId = 1;
    mockGetInvites.mockResolvedValue([]); // No invites found for user

    // When
    const getInvites = async () => await inviteService.getInvites(userId);

    // Then
    await expect(getInvites).rejects.toThrow(`No invites found for user with id ${userId}`);
});

test('should delete an invite successfully', async () => {
    // Given
    const inviteId = 1;
    const invite = new Invite({ id: inviteId, teamId: 1, userId: 1 });
    mockGetInviteById.mockResolvedValue(invite);
    mockDeleteInvite.mockResolvedValue(undefined);

    // When
    await inviteService.deleteInvite(inviteId);

    // Then
    expect(mockDeleteInvite).toHaveBeenCalledTimes(1);
    expect(mockDeleteInvite).toHaveBeenCalledWith(inviteId);
});

test('should throw an error if invite to delete is not found', async () => {
    // Given
    const inviteId = 1;
    mockGetInviteById.mockResolvedValue(null); // Invite not found

    // When
    const deleteInvite = async () => await inviteService.deleteInvite(inviteId);

    // Then
    await expect(deleteInvite).rejects.toThrow('Invite not found');
});

