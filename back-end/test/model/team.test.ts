import { Player } from '../model/player';
import { Invite } from '../model/invite';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';

test('given: valid values for team, when: team is created, then: team is created with those values', () => {
    //given
    const name = 'Daan Schoenaers';
    const country = 'Belgium';
    const player1 = new Player({
        age: 21,
        name: 'Daan Schoenaers',
        country: 'Belgium',
        description: 'Student',
        email: 'daan.schoenaers@gmail.com',
    });
    //when
    const team = new Team({ name, country, players: [player1] });

    //then
    expect(team.name).toEqual(name);
    expect(team.country).toEqual(country);
});
