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
 *                $ref: '#/components/schemas/Player'
 *              description: List of players in the team.
 */

import  teamService  from '../service/team.service';
import express, { NextFunction, Request, Response } from 'express';

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
teamRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

export {teamRouter}