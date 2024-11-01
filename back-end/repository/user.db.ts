import { User} from "../model/user";

const users = [
    new User({
        age: 21,
        name: "Daan Schoenaers",
        country: "Belgium",
        description: "Student",
        email: "daan.schoenaers@gmail.com",
        role: "Player"
    }),
    new User({
        age: 21,
        name: "Florian Lebrun",
        country: "Belgium",
        description: "Student",
        email: "florian.lebrun@gmail.com",
        role: "Player"
    }),
    new User({
        age: 21,
        name: "Maxim Delloye",
        country:"Italy",
        description: "Student",
        email: "maxim.delloye@gmail.com",
        role: "Player"
    }),
    
    new User({
        age: 21,
        name: "Natan Delloye",
        country: "Italy",
        description: "Student",
        email: "natan.delloye@gmail.com",
        role: "Player"
    })
];

const getAllPlayers = (): User[] => users;

export default { getAllPlayers };