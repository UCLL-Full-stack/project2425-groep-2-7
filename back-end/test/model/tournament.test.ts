import { User } from '../../model/user';
import { Invite } from '../../model/invite';
import { Team } from '../../model/team';
import { Tournament } from '../../model/tournament';

// Create a player
const player1 = new User({
    age: 21,
    name: 'Daan Schoenaers',
    country: 'Belgium',
    description: 'Student',
    email: 'daan.schoenaers@gmail.com',
    password: 'Hallo',
    role: 'Admin',
});

// Create a team with players
const team1 = new Team({
    name: 'pro players',
    country: 'Belgium',
    players: [{ user: player1 }], // Corrected structure
});

// Tournament test
test('given: valid values for tournament, when: tournament is created, then: tournament is created with those values', () => {
    // Given
    const name = 'Pro players';
    const location = 'Belgium, Antwerp';
    const game = 'CS2';
    const teams = [team1]; // Include teams if Tournament expects them

    // When
    const tournament = new Tournament({
        name,
        location,
        game,
        teams, // Include teams if required
    });

    // Then
    expect(tournament.getName()).toEqual(name);
    expect(tournament.getLocation()).toEqual(location);
    expect(tournament.getGame()).toEqual(game);
});
