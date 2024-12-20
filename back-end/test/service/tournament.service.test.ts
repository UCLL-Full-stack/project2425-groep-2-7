import tournamentService from '../../service/tournament.service';
import { Tournament } from '../../model/tournament';
import { TournamentInput } from '../../types';
import tournamentDb from '../../repository/tournament.db';

// Mock the TournamentDb repository
jest.mock('../../repository/tournament.db');

const mockAddTournament = jest.fn();
const mockGetAllTournaments = jest.fn();

beforeEach(() => {
    // Reset mock functions before each test
    mockAddTournament.mockReset();
    mockGetAllTournaments.mockReset();
    
    tournamentDb.addTournament = mockAddTournament;
    tournamentDb.getAllTournaments = mockGetAllTournaments;
});

test('should get all tournaments', async () => {
    // Given
    const tournaments = [
        new Tournament({
            name: 'Tournament 1',
            location: 'Location 1',
            game: 'Game 1',
        }),
        new Tournament({
            name: 'Tournament 2',
            location: 'Location 2',
            game: 'Game 2',
        }),
    ];

    mockGetAllTournaments.mockResolvedValue(tournaments);

    // When
    const result = await tournamentService.getAllTournaments();

    // Then
    expect(mockGetAllTournaments).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tournaments);
});

test('should throw error when no tournaments are found', async () => {
    // Given
    mockGetAllTournaments.mockResolvedValue(null); // No tournaments found

    // When
    const getAllTournaments = async () => await tournamentService.getAllTournaments();

    // Then
    await expect(getAllTournaments).rejects.toThrow('No tournaments found');
});

test('should add a tournament successfully', async () => {
    // Given
    const tournamentInput: TournamentInput = {
        name: 'New Tournament',
        location: 'New Location',
        game: 'New Game',
    };
    
    const newTournament = new Tournament({
        name: tournamentInput.name,
        location: tournamentInput.location,
        game: tournamentInput.game,
    });

    mockAddTournament.mockResolvedValue(newTournament);

    // When
    const result = await tournamentService.addTournament(tournamentInput);

    // Then
    expect(mockAddTournament).toHaveBeenCalledTimes(1);
    expect(mockAddTournament).toHaveBeenCalledWith(tournamentInput);
    expect(result).toEqual(newTournament);
});

test('should throw error when adding a tournament fails', async () => {
    // Given
    const tournamentInput: TournamentInput = {
        name: 'Invalid Tournament',
        location: 'Invalid Location',
        game: 'Invalid Game',
    };

    mockAddTournament.mockRejectedValue(new Error('Error adding tournament'));

    // When
    const addTournament = async () =>
        await tournamentService.addTournament(tournamentInput);

    // Then
    await expect(addTournament).rejects.toThrow('Error adding tournament');
});
