import { Player } from '../model/player';
import { Invite } from '../model/invite';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';

test('given: valid values for player, when: player is created, then: player is created with those values', () => {
    //given
    const age = 21;
    const name = 'Daan Schoenaers';
    const country = 'Belgium';
    const description = 'Student';
    const email = 'daan.schoenaers@gmail.com';
    //when
    const player = new Player({ age, name, country, description, email });

    //then
    expect(player.age).toEqual(age);
    expect(player.name).toEqual(name);
    expect(player.country).toEqual(country);
    expect(player.description).toEqual(description);
    expect(player.email).toEqual(email);
});
