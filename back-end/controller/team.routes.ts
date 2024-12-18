/**
 * @swagger
 *   components:
 *    schemas:
 *      Team:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Name of the team.
 *            country:
 *              type: string
 *              description: Country of the team.
 *            players:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *              description: List of players in the team.
 */

import teamService from '../service/team.service';
import express, { NextFunction, Request, Response } from 'express';
import { TeamIdInput } from '../types';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get a list of all teams.
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/{teamId}:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get a specific team by its ID.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the team to retrieve.
 *     responses:
 *       200:
 *         description: A single team object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found.
 */
teamRouter.get('/:teamId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamService.getTeamById(parseInt(req.params.teamId));
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams:
 *   post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a new team.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Team'
 *      responses:
 *         200:
 *            description: The created team.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Request Body:', req.body);
    try {
        const team = <TeamIdInput>req.body;
        console.log(team);
        const result = await teamService.addTeam(team);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/{teamId}/{playerId}:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summary: Add a player to the team.
 *     description: Adds a player to a team based on the teamId and playerId, and returns the updated team.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the team to which the player will be added.
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the player to be added to the team.
 *     responses:
 *       200:
 *         description: The updated team after adding the player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Invalid teamId or playerId.
 */
teamRouter.post('/:teamId/:playerId', async (req: Request, res: Response) => {
    try {
        const { teamId, playerId } = req.params;
        // Convert params to numbers (assuming they are passed as strings)
        const teamIdNum = parseInt(teamId, 10);
        const playerIdNum = parseInt(playerId, 10);
        console.log(teamIdNum, playerIdNum);

        const result = await teamService.addPlayerToTeam(playerIdNum, teamIdNum);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding player to team:', error);
        res.status(500).json({ message: 'An error occurred while adding the player to the team' });
    }
});

export { teamRouter };
