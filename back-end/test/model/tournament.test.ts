import { User } from '../../model/user';
import { Invite } from '../../model/invite';
import { Team } from '../../model/team';
import { Tournament } from '../../model/tournament';

const player1 = new User({
    age: 21,
    name: 'Daan Schoenaers',
    country: 'Belgium',
    description: 'Student',
    email: 'daan.schoenaers@gmail.com',
    role: 'Admin',
});
const team1 = new Team({ name: 'pro players', country: 'Belgium', players: [player1] });

test('given: valid values for tournament, when: tournament is created, then: tournament is created with those values', () => {
    //given
    const name = 'Pro players';
    const location = 'Belgium, Antwerp';
    const game = 'CS2';
    const team = team1;
    //when
    const tournament = new Tournament({ name, location, game });

    //then
    expect(tournament.getName()).toEqual(name);
    expect(tournament.getLocation()).toEqual(location);
    expect(tournament.getGame()).toEqual(game);
});
