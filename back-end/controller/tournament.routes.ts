/**
 * @swagger
 *   components:
 *    schemas:
 *      Tournament:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Name of the tournament.
 *            location:
 *              type: string
 *              description: Location of the tournament.
 *            game:
 *              type: string
 *              description: Game being played in the tournament.
 *            teams:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Team'
 *              description: List of teams participating in the tournament.
 */

import tournamentService from '../service/tournament.service';
import express, { NextFunction, Request, Response } from 'express';

const tournamentRouter = express.Router();

/**
 * @swagger
 * /tournaments:
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
tournamentRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        next(error);
    }
});

export {tournamentRouter}