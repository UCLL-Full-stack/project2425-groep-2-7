import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { AuthenticationResponse, UserInput } from '../../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';

// Mock the bcrypt.compare function as a promise
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

// Mock userDb's getUserByEmail method
jest.mock('../../repository/user.db', () => ({
    getUserByEmail: jest.fn(), // Mock function here
}));

// Mock generateJwtToken function
jest.mock('../../util/jwt', () => ({
    generateJwtToken: jest.fn(),
}));

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error for incorrect password', async () => {
        // Arrange
        const mockUser = {
            email: 'test@example.com',
            password: 'hashedpassword123',
            role: 'Player',
            age: 25,
            name: 'Test User',
            country: 'Country',
            description: 'Description',
            id: 1,
        };

        const userInput: UserInput = {
            id: 1, // Add the missing id here
            email: 'test@example.com',
            password: 'incorrectPassword',  // Provide the incorrect password here
            age: mockUser.age,
            name: mockUser.name,
            country: mockUser.country,
            description: mockUser.description,
        };

        // Mock the bcrypt.compare function to always return false for incorrect password
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        // Mock userDb.getUserByEmail to return the mock user
        (userDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

        // Act & Assert
        await expect(userService.authenticate(userInput)).rejects.toThrowError('incorrect password.');
    });

    test('should authenticate and return token for valid credentials', async () => {
        // Arrange
        const mockUser = {
            email: 'test@example.com',
            password: 'hashedpassword123',
            role: 'Player',
            age: 25,
            name: 'Test User',
            country: 'Country',
            description: 'Description',
            id: 1,
        };

        const userInput: UserInput = {
            id: 1, // Add the missing id here
            email: 'test@example.com',
            password: 'correctPassword',  // Provide the correct password here
            age: mockUser.age,
            name: mockUser.name,
            country: mockUser.country,
            description: mockUser.description,
        };

        // Mock bcrypt.compare to return true for the correct password
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        // Mock userDb.getUserByEmail to return the mock user
        (userDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

        // Mock the generateJwtToken function to return a mock token
        const mockJwtToken = 'mockToken';
        (generateJwtToken as jest.Mock).mockReturnValue(mockJwtToken);

        // Act
        const result = await userService.authenticate(userInput);

        // Assert
        expect(result).toEqual({
            token: mockJwtToken,
            email: mockUser.email,
            role: mockUser.role,
        });
    });
});
