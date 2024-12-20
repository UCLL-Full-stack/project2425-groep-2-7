import teamService from '../../service/team.service';
import teamDb from '../../repository/team.db';
import userService from '../../service/user.service';

// Mock the functions from teamDb and userService correctly
jest.mock('../../repository/team.db', () => ({
    getTeamById: jest.fn(),
    addPlayerToTeam: jest.fn(),
    getAllTeams: jest.fn(),
}));
jest.mock('../../service/user.service', () => ({
    getPlayerById: jest.fn(),
}));

describe('teamService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should throw error when team does not exist in addPlayerToTeam', async () => {
        // Arrange
        const validPlayerId = 1;
        const invalidTeamId = 999;  // Team that does not exist
        (teamDb.getTeamById as jest.Mock).mockResolvedValue(null);  // Mock team not found

        // Act & Assert
        await expect(teamService.addPlayerToTeam(validPlayerId, invalidTeamId)).rejects.toThrowError('Team with id 999 not found');
    });

    test('should throw error when player does not exist in addPlayerToTeam', async () => {
        // Arrange
        const invalidPlayerId = 999;  // Player that does not exist
        const validTeamId = 1;
        (userService.getPlayerById as jest.Mock).mockResolvedValue(null);  // Mock player not found

        // Act & Assert
        await expect(teamService.addPlayerToTeam(invalidPlayerId, validTeamId)).rejects.toThrowError('Player with id 999 not found');
    });

    test('should successfully add player to team when both team and player exist', async () => {
        // Arrange
        const validPlayerId = 1;
        const validTeamId = 1;
        const mockTeam = { id: 1, name: 'Team A', country: 'USA', players: [] };  // Mock team
        const mockUser = { id: 1, name: 'Player 1' };  // Mock user
        (teamDb.getTeamById as jest.Mock).mockResolvedValue(mockTeam);  // Mock team found
        (userService.getPlayerById as jest.Mock).mockResolvedValue(mockUser);  // Mock player found
        (teamDb.addPlayerToTeam as jest.Mock).mockResolvedValue(true);  // Mock adding player to team

        // Act
        await teamService.addPlayerToTeam(validPlayerId, validTeamId);

        // Assert
        expect(teamDb.getTeamById).toHaveBeenCalledWith(validTeamId);
        expect(userService.getPlayerById).toHaveBeenCalledWith(validPlayerId);
        expect(teamDb.addPlayerToTeam).toHaveBeenCalledWith(validTeamId, validPlayerId);
    });
});
