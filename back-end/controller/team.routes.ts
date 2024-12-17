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
    console.log("Request Body:", req.body);
    try {
        
        const team = <TeamIdInput>req.body;
        console.log(team);
        const result = await teamService.addTeam(team);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


export { teamRouter};
