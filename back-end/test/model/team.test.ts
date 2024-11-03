import { User } from '../../model/user';
import { Invite } from '../../model/invite';
import { Team } from '../../model/team';
import { Tournament } from '../../model/tournament';

test('given: valid values for team, when: team is created, then: team is created with those values', () => {
    //given
    const name = 'Daan Schoenaers';
    const country = 'Belgium';
    const player1 = new User({
        age: 21,
        name: 'Daan Schoenaers',
        country: 'Belgium',
        description: 'Student',
        email: 'daan.schoenaers@gmail.com',
        role: 'Admin',
    });
    //when
    const team = new Team({ name, country, players: [player1] });

    //then
    expect(team.getName()).toEqual(name);
    expect(team.getCountry()).toEqual(country);
});
