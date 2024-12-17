import { User } from '../../model/user';
import { Invite } from '../../model/invite';
import { Team } from '../../model/team';
import { Tournament } from '../../model/tournament';

test('given: valid values for player, when: player is created, then: player is created with those values', () => {
    //given
    const age = 21;
    const name = 'Daan Schoenaers';
    const country = 'Belgium';
    const description = 'Student';
    const email = 'daan.schoenaers@gmail.com';
    const password = 'Hallo';
    const role = 'Admin';
    //when
    const player = new User({ age, name, country, description, email, password, role });

    //then
    expect(player.getAge()).toEqual(age);
    expect(player.getName()).toEqual(name);
    expect(player.getCountry()).toEqual(country);
    expect(player.getDescription()).toEqual(description);
    expect(player.getEmail()).toEqual(email);
    expect(player.getRole()).toEqual(role);
});
