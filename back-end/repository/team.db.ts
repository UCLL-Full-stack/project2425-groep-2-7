    import { Team } from "../model/team";
    import { User} from "../model/user";
    import { PrismaClient } from "@prisma/client";

    const database = new PrismaClient();

    const player1 = new User({
        age: 21,
        name: "Daan Schoenaers",
        country: "Belgium",
        description: "Student",
        email: "daan.schoenaers@gmail.com",
        role: "Player",
        password: "password123",
    })

    const player2 = new User({
        age: 21,
        name: "Florian Lebrun",
        country: "Belgium",
        description: "Student",
        email: "florian.lebrun@gmail.com",
        role: "Player",
        password: "password123",
    })

    const player3 = new User({
        age: 21,
        name: "Maxim Delloye",
        country:"Italy",
        description: "Student",
        email: "maxim.delloye@gmail.com",
        role: "Player",
        password: "password123",
    })

    const player4 = new User({
        age: 20,
        name: "Natan Delloye",
        country: "Italy",
        description: "Student",
        email: "natan.delloye@gmail.com",
        role: "Player",
        password: "password123",
    });


    const Players = [player1, player2, player3, player4]
    const wrapPlayers = (players: User[]): { user: User }[] =>
        players.map(player => ({ user: player }));

    const team1 = new Team({ name: 'ProPlayers', country: 'Belgium', players: wrapPlayers(Players) })
    const team2 = new Team({ name: 'Belgium ProPlayers', country: 'Belgium', players: wrapPlayers([player1, player2]) })
    const team3 = new Team({ name: 'Italy ProPlayers', country: 'Italy', players: wrapPlayers([player3, player4]) })

    const teams = [team1, team2, team3]

    const getAllTeams = async (): Promise<Team[]> => {
        try {
            const teamprisma = await database.team.findMany({
                include: {
                    players: true
                }
            });
            return teamprisma.map((teamprisma) =>  Team.from(teamprisma));
        } catch (error) {
            console.error('Error fetching teams:', error);
            throw error;
        }        
    };
    
    const getTeamById = async (teamId: number): Promise<Team> => {
        console.log(teamId);
        try {
            const teamprisma = await database.team.findFirst({
                where: {
                    id: teamId
                },
                include: {
                    players: true
                }
            });
            if (!teamprisma) throw new Error('Team with Id ${teamId} not found');
            return Team.from(teamprisma);
        } catch (error) {
            console.error('Error fetching team:', error);
            throw error;
        }
    }
    
    const addPlayerToTeam = async (teamId: number, playerId: number) => {
        try {
            await database.team.update({ 
                where: { id: teamId },  
                data: {
                    players: {
                        connect: { id: playerId },  
                    },
                },
            });
            console.log(`Player with ID ${playerId} added to team with ID ${teamId}`);
            return await getTeamById(teamId);
        } catch (error) {
            console.log('Error adding player to team:', error);
            throw error; 
        }
    };
    

    const addTeam = async (teamData: {
        name: string;
        country: string;
        creatorId: number; // Pass the ID of the creator
      }): Promise<Team> => {
        try {
        
          const { name, country, creatorId } = teamData;
          console.log(creatorId)
          // Persist the team to the database
          const createdTeam = await database.team.create({
            data: {
              name,
              country,
              players: {
                connect: { id: creatorId }, // Connect the creator to the team
              },
            },
          });
      
          // Return the created Team instance
          return Team.from(createdTeam);
        } catch (error) {
        
          console.error("Error adding team to the database:", error);
          throw error;
        }
      };
      
    

    export default {getAllTeams, getTeamById, addTeam, addPlayerToTeam};

